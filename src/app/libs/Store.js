import EventEmitter from 'events';

export default class Store {
    /**
    * @constructor
    * @this {Store}
    * @param {string} name The name of the store
    */
    constructor(name) {
        this._storeName = name;
        this._registeredComponents = {};
        this._storeData = {};
        this._actions = {};
        this._eventbus = new EventEmitter();
        this._eventbus.on('STORE_UPDATED', this._onUpdate.bind(this));
        this._isDebugging = false;
    }

    /**
    * Define the store data with a key-value pair object
    * @param {object} keys object with key-value pairs
    */
    defineStore(keys) {
        for (let key in keys) {
            this._storeData[key] = keys[key];
        }
        this._debug(`Store [${this.name}] defined with data=${JSON.stringify(this.storeData)}`);
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
    get isDebugging() {
        return this._isDebugging;
    }

    /**
    * Configure the logging process in the store
    * @param {bool} bool state of the logger
    */
    set isDebugging(isDebugging) {
        if (isDebugging) {
            this._isDebugging = isDebugging;
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
    * Read-only Property for the registered Components of the store
    */
    get registeredComponents() {
        return this._registeredComponents;
    }

    /**
    * Set keys in the store to a new value
    *
    * @param {object} keys object with key-value pairs
    * @param {boolean} silently set the key-values but dont update the store
    * @throws exception if the key does not exist
    */
    set(keys, silently = false) {
        for (let key in keys) {
            this._debug(`Attempting to set key [${key}]=${JSON.stringify(keys[key])}`);
            // Check if key is defined in the Store
            if (key in this._storeData) {
                // Check if received value for key is not undefined or not null
                if (keys[key] !== undefined) {
                    // Check if key is defined in the Store as an object
                    if (typeof this._storeData[key] === 'object') {
                        // Check if the object was initialized as null
                        if (this._storeData[key] === null) {
                            this._storeData[key] = this._clone(keys[key]);
                        }
                        // Check if the Object is generic
                        else if (this._storeData[key].constructor.name === 'Object') {
                            // Recursive merge of objects
                            this._debug(`Object for key [${key}] already exists, merging existing ${JSON.stringify(this._storeData[key])} with new ${JSON.stringify(keys[key])}`);
                            this._storeData[key] = this._merge(this._storeData[key], keys[key]);
                        }// Fallback type check for all object types, WARNING: the object will be overwritten
                        else if (this._storeData[key].constructor.name === keys[key].constructor.name) {
                            this._storeData[key] = this._clone(keys[key]);
                        }
                        // Fallback error for Object types, usually means a wrong type assignment
                        else {
                            throw `Store.set: key [${key}] is of Type=[${this._storeData[key].constructor.name}], not [${keys[key].constructor.name}]`;
                        }
                    }
                    // Check if key is defined in the Store as a primitive
                    else if (typeof this._storeData[key] === 'number' || typeof this._storeData[key] === 'boolean' || typeof this._storeData[key] === 'string') {
                        // Check if the primitive is not null
                        if (keys[key] !== null) {
                            this._storeData[key] = keys[key];
                        } else {
                            throw `Store.set: [${key}] is a primitive, can't set it's value to null`;
                        }
                    } else {
                        // Fallback error for type not found, usually means that for some reason the Store value became undefined
                        throw `Store.set: Unknown value type for key [${key}]`;
                    }
                } else {
                    // Thrown if the attempting to set a key to undefined
                    throw `Store.set: Failed to set undefined value for key [${key}]`;
                }
                this._debug(`Successfully set key [${key}]=${JSON.stringify(this._storeData[key])}`);
            } else {
                // Thrown if received key is not defined in the Store
                throw `Store.set: Unknown key [${key}] in store`;
            }
        }
        if (!silently) {
            this.update();
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
            throw `Store.get: Unknown key [${key}] in store`;
        }
    }

    /**
    * Function triggered by the dispatcher
    * @param {string} actionType name of the action to be called
    * @param {object} args optional data to be passed to the action's callback
    */
    onAction(actionType, ...args) {
        this._debug(`Received Action [${actionType}] with data=${JSON.stringify(...args)}`);
        if (actionType in this._actions) {
            this._actions[actionType].apply(this, args);
        } else {
            this._debug('Unknown actionType for this store - ignoring');
        }

    }

    /**
    * A Component needs to be able to register itself with the store to receive
    * notifications of updates to the store
    *
    * @param {function} callback the method to call back
    * @returns {string} an ID to be used when un-registering
    */
    register(callback) {
        let id = `${this._storeName}-${this._guid}`;
        this._debug(`Registering new Component Callback and returning ID [${id}]`);
        this._registeredComponents[id] = callback;
        return id;
    }

    /**
    * A Component also needs to be able to unregister itself with the store to
    * stop receiving notifications of updates to the store.
    *
    * @param {string} id the ID from the call to register()
    */
    unregister(id) {
        if (id in this._registeredComponents) {
            this._debug(`Unregistering Component Callback with ID [${id}]`);
            delete this._registeredComponents[id];
        } else {
            throw 'Invalid Component Registration ID';
        }
    }

    /**
    * Emit a UPDATE_STORE event on the private Event Bus
    */
    update() {
        this._debug('Emitting Store update Event');
        this._eventbus.emit('STORE_UPDATED');
    }

    /**
    * Executed when an UPDATE_STORE even is emmited on the private Event Bus
    */
    _onUpdate() {
        this.notifyAll();
    }

    /**
    * Notifies only the specified store by componentID
    * @param {string} componentID the unique component identifier
    */
    notify(componentID) {
        if (componentID in this._registeredComponents) {
            this._debug(`Sending Store Update Event to Component Registration [${componentID}]`);
            this._registeredComponents[componentID]();
        } else {
            this._debug(`No registered component such as [${componentID}]`);
        }
    }

    /**
    * Notifies every registered component in the store
    */
    notifyAll() {
        for (let componentID in this._registeredComponents) {
            this.notify(componentID);
        }
    }

    /**
    * Helper function function that logs based on this._isDebugging state
    * @param {string} log message to be logged
    */
    _debug(log, ...args) {
        if (this._isDebugging) {
            console.debug(log, ...args);
        }
    }

    /**
    * Helper function that generates an RFC-4122 Version 4 compliant Unique ID.
    * @return {string} u the ID
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
    /**
    * Helper function used to clone an object
    * @param {object} obj the object to clone
    * @return {object} copy the cloned object
    */
    _clone(obj) {
        if (null == obj || "object" != typeof obj) {
            return obj;
        }
        let copy = obj.constructor();
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    /**
    * Helper function that merge to objects
    * @param {object} target target object
    * @param {object} soruce source object, equally named attributes take preference
    * @return {object} merged the merged object
    */
    _merge(target, source, optionsArgument) {
        /**
        * The MIT License (MIT)
        * Copyright (c) 2012 Nicholas Fisher
        * Implementation of Nicholas Fisher deepmerge library for ES6
        */
        let _deepmerge = (target, source, optionsArgument) => {
            let array = Array.isArray(source);
            let options = optionsArgument || { arrayMerge: _defaultArrayMerge }
            let arrayMerge = options.arrayMerge || _defaultArrayMerge

            if (array) {
                target = target || [];
                return _arrayMerge(target, source, optionsArgument)
            } else {
                return _mergeObject(target, source, optionsArgument)
            }
        }

        let _isMergeableObject = (val) => {
            let nonNullObject = val && typeof val === 'object'

            return nonNullObject
            && Object.prototype.toString.call(val) !== '[object RegExp]'
            && Object.prototype.toString.call(val) !== '[object Date]'
        }

        let _defaultArrayMerge = (target, source, optionsArgument) => {
            let destination = target.slice()
            source.forEach((e, i) => {
                if (typeof destination[i] === 'undefined') {
                    destination[i] = e
                } else if (_isMergeableObject(e)) {
                    destination[i] = _deepmerge(target[i], e, optionsArgument)
                } else if (target.indexOf(e) === -1) {
                    destination.push(e)
                }
            })
            return destination
        }

        let _mergeObject = (target, source, optionsArgument) => {
            let destination = {}
            if (_isMergeableObject(target)) {
                Object.keys(target).forEach((key) => {
                    destination[key] = target[key]
                })
            }
            Object.keys(source).forEach((key) => {
                if (!_isMergeableObject(source[key]) || !target[key]) {
                    destination[key] = source[key]
                } else {
                    destination[key] = _deepmerge(target[key], source[key], optionsArgument)
                }
            })
            return destination
        }

        return _deepmerge(target, source, optionsArgument);

    }
}
