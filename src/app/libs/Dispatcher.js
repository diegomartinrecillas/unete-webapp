/*The MIT License (MIT)

Copyright (c) 2015 Adrian Hall

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/
import EventEmitter from 'events';
import Logger from './Logger';
import {assign} from 'lodash';

export default class Dispatcher {
    /**
     * Create a new instance of the Dispatcher.  Note that the Dispatcher
     * is a Singleton pattern, so only one should ever exist.
     *
     * @constructor
     * @this {Dispatcher}
     * @param {object} options  Over-rides for the default set of options
     */
    constructor(options = {}) {
        // Create the required functional objects we need
        this.eventbus = new EventEmitter();

        // Establish options for the Dispatcher
        let defaultOptions = {
            debug: false,
            logLevel: 'ERROR'
        };
        this.options = assign(defaultOptions, options);
        this.logger = new Logger('Dispatcher', { logLevel: this.options.logLevel });

        // Create a hash of all the stores - used for registration / deregistration
        this.logger.debug('Initializing Store Hash');
        this.stores = {};
    }

    /**
     * Dispatches an Action to all the stores
     *
     * @param {Action} action The action to dispatch to all the stores
     */
    dispatch(actionType, data = {}) {
        if (typeof actionType !== 'string') {
            this.logger.error('Dispatch request for an invalid Action (no actionType) - ignoring');
            return;
        }

        // When an action comes in, it must be completely handled by all stores
        this.logger.debug(`Dispatching Action: ${actionType}: `, data);
        for (let storeName in this.stores) {
            this.logger.debug(`Dispatching Action: ${actionType} to store ${storeName}`);
            this.stores[storeName].onAction(actionType, data);
        }
    }

    /**
     * Registers a new Store with the Dispatcher
     *
     * @param {string} name A unique name for the Store
     * @param {Store} store The store object
     * @throws {Exception} Store Already Exists
     */
    registerStore(store) {
        let name = store.name;
        if (name in this.stores) {
            this.logger.error(`Store ${name} is already registered`);
            throw 'Store Already Exists';
        }
        this.stores[name] = store;
        this.logger.debug(`Store ${name} registered`);
    }

    /**
     * De-registers a named store from the Dispatcher (completeness of API)
     *
     * @param {string} name The name of the store
     * @param {bool} force Force the store to unmount
     */
    deregisterStore(name, force = false) {
        if (name in this.stores) {
            this.logger.debug(`Store ${name} deregistered`);
            delete this.stores[name];
        } else {
            this.logger.error(`Store ${name} is not registered (cannot deregister)`);
            if (!force) {
                throw 'Store is not registered';
            }
        }
    }

    /**
     * Gets a store that is registered with the Dispatcher
     *
     * @param {string} name The name of the store
     * @returns {Store} the store object
     * @throws 'Invalid Store' if the store does not exist
     */
    getStore(name) {
        if (name in this.stores) {
            return this.stores[name];
        } else {
            throw 'Invalid Store';
        }
    }
}
