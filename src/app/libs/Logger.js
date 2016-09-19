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

import {assign} from 'lodash';

class Logger {
    /**
     * Create a new Logger object
     *
     * @constructor
     * @this {Logger}
     * @param {string} category - the log category
     * @param {object} options - over-ride for the options
     */
    constructor(category, options = {}) {
        this.category = category;
        this.logLevel = assign({
            // Default Options
            logLevel: 10
        }, options);
    }

    /**
     * Turn a numeric level into a name
     *
     * @param {number} level the level number
     * @returns {string} the level name
     */
    logLevelName(level) {
        for (let l in Logger.LogLevels) {
            if (Logger.LogLevels[l] === level) {
                return l;
            }
        }
        return 'UNKNOWN';
    }

    /**
     * Turn a named level into a number
     *
     * @param {string} level the level name
     * @param {number} the level number
     */
    logLevelValue(level) {
        return Logger.LogLevels[level] || 10;
    }

    /**
     * Log a message to the console
     *
     * @param {string | number} level the level of the log message
     * @param ...arguments arguments the rest of the message
     */
    log(level, ...args) {
        let logLevel = (typeof level === 'string') ? this.logLevelValue(level) : level;
        if (logLevel < this.logLevel) {
            return; // We should not be logging this
        }
        switch (logLevel) {
            case 1:
                console.trace(`[${this.category}]`, ...args);
                break;
            case 2:
                console.debug(`[${this.category}]`, ...args);
                break;
            case 3:
                console.info(`[${this.category}]`, ...args);
                break;
            case 4:
                console.warn(`[${this.category}]`, ...args);
                break;
            case 5:
                console.error(`[${this.category}]`, ...args);
                break;
            default:
                console.log(`[${this.category}]`, ...args);
                break;
        }
    }

    // Convenience methods for the rest of the LogLevels
    trace() { this.log('TRACE', ...arguments); }
    debug() { this.log('DEBUG', ...arguments); }
    info() { this.log('INFO', ...arguments); }
    warn() { this.log('WARN', ...arguments); }
    error() { this.log('ERROR', ...arguments); }
}

/**
 * Definition of the valid log LogLevels
 */
Logger.LogLevels = {
    ALL: 0,
    TRACE: 1,
    DEBUG: 2,
    INFO: 3,
    WARN: 4,
    ERROR: 5,
    OFF: 10
};

export default Logger;
