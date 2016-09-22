import EventEmitter from 'events';
import Logger from './Logger';

export default class Store {
    /**
    * @constructor
    * @this {Store}
    * @param {string} name The name of the store
    */
    constructor(name) {
        this._storeName = name;
        this._registeredViews = {};
        this._storeData = {};
        this._actions = {};
        this._eventbus = new EventEmitter();
        this._eventbus.on('STORE_CHANGED', this._onStoreChange.bind(this));

        this.logger = new Logger(this._storeName, 2);
        this.logger.debug('Registering local event bus listener for STORE_CHANGED event');

    }

    /**
    * Define the store data with a key-value pair object
    * @param {object} keys object with key-value pairs
    */
    defineStore(keys) {
        for (let key in keys) {
            this._storeData[key] = keys[key];
        }
    }

    /**
    * Bind the ActionTypes with their respective action
    * @param {object} actions object with action-callback pairs
    */
    bindActions(actions) {
        for (let action in actions) {
            this._actions[action] = actions[action];
        }

    }

    /**
    * Read-only Property for the name of the store
    */
    get name() {
        return this._storeName;
    }

    /**
    * Read-only Property for the data of the store
    */
    get storeData() {
        return this._storeData;
    }

    /**
    * Read-only Property for the registered Views of the store
    */
    get registeredViews() {
        return this._registeredViews;
    }

    /**
    * Set a key in the store to a new value
    *
    * @param {object} keys object with key-value pairs
    * @throws exception if the key does not exist
    */
    set(keys, squashEvent = false) {
        for (let key in keys) {
            this.logger.debug(`Setting ${key}=${keys[key]}`);
            if (key in this._storeData) {
                this._storeData[key] = keys[key];
            } else {
                this.logger.error(`Store.set: Unknown key ${key} in store`);
            }
        }
        if (!squashEvent) {
            this.changeStore();
        }
    }

    /**
    * Retrieve a key in the store
    *
    * @param {string} key the key name
    * @returns {object} the key value
    * @throws exception if the key does not exist
    */
    get(key) {
        if (key in this._storeData) {
            return this._storeData[key];
        } else {
            this.logger.error(`Store.get: Unknown key ${key} in store`);
        }
    }

    /**
    * Function triggered by the dispatcher
    * @param {string} actionType name of the action to be called
    * @param {object} args optional data to be passed to the action's callback
    */
    onAction(actionType, ...args) {
        if (args.length >= 1) {
            this.logger.debug(`Received Action ${actionType} with data`, ...args);
        } else {
            this.logger.debug(`Received Action ${actionType} with no aditional data`);
        }
        if (actionType in this._actions) {
            this._actions[actionType].apply(this, args);
        } else {
            this.logger.debug('Unknown actionType for this store - ignoring');
        }

    }

    /**
    * A view needs to be able to register itself with the store to receive
    * notifications of updates to the store
    *
    * @param {function} callback the method to call back
    * @returns {string} an ID to be used when un-registering
    */
    registerView(callback) {
        let id = `${this._storeName}-${this._guid}`;
        this.logger.debug(`Registering new View Callback and returning ID ${id}`);
        this._registeredViews[id] = callback;
        return id;
    }

    /**
    * A view also needs to be able to de-register itself with the store to
    * stop receiving notifications of updates to the store.
    *
    * @param {string} id the ID from the call to registerView()
    * @param {boolean} force don't throw an error if it doesn't exist
    */
    deregisterView(id, force = false) {
        this.logger.debug(`deregisterView(${id}, ${force})`);
        if (id in this._registeredViews) {
            this.logger.debug(`Deregistering View Callback with ID ${id}`);
            delete this._registeredViews[id];
        } else {
            if (!force) {
                throw 'Invalid View Registration ID';
            }
        }
    }

    /**
    * Emit a change store event on the private Event Bus
    */
    changeStore() {
        this.logger.debug('Emitting Store Change Event');
        this._eventbus.emit('STORE_CHANGED');
    }

    /**
    * Pass on change store events to the registered views
    */
    _onStoreChange() {
        for (let viewID in this._registeredViews) {
            this.logger.debug(`Sending Store Change Event to View Registration ${viewID}`);
            this._registeredViews[viewID]();
        }
    }

    /**
    * Generate an RFC-4122 Version 4 compliant Unique ID.  We only need
    * pseudo IDs since we are salting with the name of the store.
    *
    * @return {string}
    */
    get _guid() {
        let u = '', i = 0;
        while (i++ < 36) {
            let c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i - 1],
            r = Math.random() * 16 | 0, v = (c === 'x' ? r : ( r & 0x3 | 0x8));
            u += (c === '-' || c === '4') ? c : v.toString(16);
        }
        return u;
    }
}
