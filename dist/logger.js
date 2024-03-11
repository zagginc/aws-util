"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _b, _c, _d, _e;
var _Logger_additionalData;
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.hideSecrets = exports.defer = exports.DEFAULT_LOG_OPTIONS = exports.Logger = exports.LOG_PRETTY_PRINT = exports.LOG_FORMAT = exports.DEFAULT_LOG_FORMAT = exports.LOG_HIDE_XRAY_DEBUG = exports.LOG_EXPOSE_SECRETS = exports.HIDDEN_TEXT = exports.LOG_LEVEL = exports.DEFAULT_LOG_LEVEL = exports.LogLevel = exports.LogFormat = void 0;
const lambda_log_1 = require("lambda-log");
const sourceMapSupport = __importStar(require("source-map-support"));
const luxon_1 = require("luxon");
var LogFormat;
(function (LogFormat) {
    LogFormat["local"] = "local";
    LogFormat["json"] = "json";
})(LogFormat = exports.LogFormat || (exports.LogFormat = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
exports.DEFAULT_LOG_LEVEL = 'DEBUG';
exports.LOG_LEVEL = LogLevel[((_a = process.env.LOG_LEVEL) !== null && _a !== void 0 ? _a : exports.DEFAULT_LOG_LEVEL).toUpperCase()];
exports.HIDDEN_TEXT = '********************************************';
exports.LOG_EXPOSE_SECRETS = Boolean((_b = process.env.LOG_EXPOSE_SECRETS) !== null && _b !== void 0 ? _b : false);
exports.LOG_HIDE_XRAY_DEBUG = Boolean((_c = process.env.LOG_HIDE_XRAY_DEBUG) !== null && _c !== void 0 ? _c : false);
exports.DEFAULT_LOG_FORMAT = process.env.NODE_ENV === 'development' ? LogFormat.local : LogFormat.json;
exports.LOG_FORMAT = LogFormat[((_d = process.env.LOG_FORMAT) !== null && _d !== void 0 ? _d : exports.DEFAULT_LOG_FORMAT).toLowerCase()];
/**
 * **For NON-PRODUCTION ONLY**
 *
 * Set `process.env.LOG_PRETTY_PRINT` to output the JSON in human-readable indenting.
 */
exports.LOG_PRETTY_PRINT = Boolean((_e = process.env.LOG_PRETTY_PRINT) !== null && _e !== void 0 ? _e : 'false');
const localOutputFormatter = (level, ...args) => {
    if (!args || args.length === 0) {
        return;
    }
    if (args.length !== 1 || typeof args[0] !== 'string') {
        console[level](args);
        return;
    }
    const json = JSON.parse(args[0]);
    const { level: _level, msg } = json;
    delete json.level;
    delete json.msg;
    console[level](luxon_1.DateTime.now().toISO({ includeOffset: false, suppressMilliseconds: true }), _level === null || _level === void 0 ? void 0 : _level.toUpperCase(), msg, json);
};
class LocalConsole {
    constructor() {
        this.debug = (message, ...args) => localOutputFormatter('debug', ...[message, ...args]);
        this.info = (message, ...args) => localOutputFormatter('info', ...[message, ...args]);
        this.warn = (message, ...args) => localOutputFormatter('warn', ...[message, ...args]);
        this.error = (message, ...args) => localOutputFormatter('error', ...[message, ...args]);
        this.log = (message, ...args) => localOutputFormatter('info', ...[message, ...args]);
    }
}
const localConsoleOutput = new LocalConsole();
// #endregion
/**
 * When you pass a custom Logger to XRay, and enable debug logging for your application,
 * you also get XRay debug logs. Many of these messages are not useful and clog up your
 * logs making it harder to debug your application.
 *
 * This function is called only if the {@link LogLevel} of the message is {@link LogLevel.DEBUG} and only if
 * {@link LOG_HIDE_XRAY_DEBUG} (env var) is set. It will filter out a bunch of XRay log messages
 * you probably don't care about.
 *
 * @param msg
 */
const isSuppressedXRayDebugLogMessage = (msg) => {
    if (!exports.LOG_HIDE_XRAY_DEBUG || typeof msg !== 'string') {
        return false;
    }
    const hiddenXRayMessages = [
        /^UDP message sent/,
        /^Lambda trace data found/,
        /^Segment started/,
        /^Subsegment sent/,
        /is not whitelisted for additional data capturing. Ignoring.$/,
    ];
    return hiddenXRayMessages.some((pattern) => msg.match(pattern));
};
class Logger extends lambda_log_1.LambdaLog {
    constructor(logOptions, additionalData) {
        super(logOptions, {
            error: Logger.createShouldLogMessageFn('error'),
            warn: Logger.createShouldLogMessageFn('warn'),
            info: Logger.createShouldLogMessageFn('info'),
            // AWS Lambda does not output console.debug so redirect to info
            debug: Logger.createShouldLogMessageFn('debug', 'info'),
        });
        _Logger_additionalData.set(this, void 0);
        __classPrivateFieldSet(this, _Logger_additionalData, additionalData, "f");
    }
    /**
     * Determines if the provided {@link msg} should be logged for the given {@link level}.
     *
     * This is mainly checking the `level` against the level this logger is configured to output,
     * but there are some runtime checks for filtering or suppressing log messages done as well.
     *
     * @param level
     * @param msg this is `unknown` because the {@link LambdaLog} code will pass through
     * whatever is sent at **runtime** as the `msg` and that is passed through here.
     * @returns
     */
    shouldLogMessage(level, msg) {
        // console.log(level, this.shouldLogLevel(level), this.options);
        switch (level) {
            case 'error':
            case 'info':
            case 'warn': {
                return this.shouldLogLevel(level);
            }
            case 'debug': {
                let result = this.shouldLogLevel(level);
                if (result && typeof msg === 'string' && isSuppressedXRayDebugLogMessage(msg)) {
                    result = false;
                }
                return result;
            }
        }
    }
    static createShouldLogMessageFn(level, targetLevel) {
        return function (msg) {
            // @ts-ignore this is annoying and weird but it's because of the strange use of `this`
            if (this.shouldLogMessage(level, msg.msg)) {
                return targetLevel !== null && targetLevel !== void 0 ? targetLevel : level;
            }
            return false;
        };
    }
    /**
     * Suppress log messages if they are above the maximum {@link LOG_LEVEL} defined.
     */
    shouldLogLevel(level) {
        var _a;
        return ((_a = LogLevel[level.toUpperCase()]) !== null && _a !== void 0 ? _a : LogLevel.ERROR) <= this.options.level;
    }
    /**
     * Override the log method to add any shared meta or shared tags onto the log output
     *
     * At **RUNTIME** the {@link msg} might not be a string since types are only checked at compile time so
     *
     * @param level
     * @param msg
     * @param meta
     * @param tags
     * @returns
     */
    log(level, msg, meta, tags) {
        var _a, _b, _c;
        // we still have to let the super call go through to construct the LogMessage and check whether to be logged.
        // however, we don't have to do any additional expensive work when this is the case, since it won't be shared anyway
        if (this.shouldLogMessage(level, msg)) {
            meta = {
                ...(_a = __classPrivateFieldGet(this, _Logger_additionalData, "f")) === null || _a === void 0 ? void 0 : _a.meta,
                ...this.callerMeta,
                ...meta,
            };
            tags = [
                ...((_c = (_b = __classPrivateFieldGet(this, _Logger_additionalData, "f")) === null || _b === void 0 ? void 0 : _b.tags) !== null && _c !== void 0 ? _c : []),
                ...(tags !== null && tags !== void 0 ? tags : []),
            ];
            if ((tags === null || tags === void 0 ? void 0 : tags.length) === 0) {
                tags = undefined;
            }
        }
        try {
            if (typeof msg === 'object') {
                msg = JSON.stringify(msg);
            }
            else if (typeof msg !== 'string') {
                msg = String(msg);
            }
        }
        catch (error) {
            // can't log here since it would be a potential recursive loop...
            // ... this is only here for runtime stability since we prefer the Logger not to crash at runtime
        }
        // we can cast msg to string here because the if/else above forces it to be a string
        return super.log(level, msg, meta, tags);
    }
    /**
     * Loads and parses the call stack, grabs the appropriate frame and then loads in
     * the filename, function and column that the log event was called from.
    */
    get callerMeta() {
        const meta = {};
        // last thing we want is an exception ruining our day
        try {
            const jsCallsite = this.callsite;
            if (jsCallsite) {
                const callsite = sourceMapSupport.wrapCallSite(jsCallsite);
                if (callsite) {
                    const caller = {
                        filename: callsite.getFileName() || undefined,
                        function: callsite.getFunctionName() || undefined,
                    };
                    if (caller.filename || caller.function) {
                        meta.caller = {
                            ...caller,
                            line: callsite.getLineNumber() || undefined,
                            column: callsite.getColumnNumber() || undefined,
                        };
                    }
                }
            }
        }
        catch (e) { }
        return meta;
    }
    /**
     * This was "borrowed" from https://github.com/sindresorhus/callsites because
     * importing it was proving challenging
    */
    get callsite() {
        var _a;
        const _prepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = (_, stack) => stack;
        // we use the 4th element [3rd index] as this accounts for the calls we've made in the logging infrastructure
        const stack = (_a = new Error().stack) === null || _a === void 0 ? void 0 : _a.slice(4);
        Error.prepareStackTrace = _prepareStackTrace;
        return stack === null || stack === void 0 ? void 0 : stack[0];
    }
    /**
     * Fork the logger into a new instance, sharing the same options and shared meta and tags
     */
    fork(additionalData) {
        var _a, _b, _c, _d;
        return new Logger(this.options, {
            meta: {
                ...(_a = __classPrivateFieldGet(this, _Logger_additionalData, "f")) === null || _a === void 0 ? void 0 : _a.meta,
                ...additionalData === null || additionalData === void 0 ? void 0 : additionalData.meta,
            },
            tags: [
                ...((_c = (_b = __classPrivateFieldGet(this, _Logger_additionalData, "f")) === null || _b === void 0 ? void 0 : _b.tags) !== null && _c !== void 0 ? _c : []),
                ...((_d = additionalData === null || additionalData === void 0 ? void 0 : additionalData.tags) !== null && _d !== void 0 ? _d : []),
            ],
        });
    }
}
exports.Logger = Logger;
_Logger_additionalData = new WeakMap();
/**
 * The default values used by the exported {@link log}.
 *
 * If you are extending {@link Logger} you can use these as the default
 * options and override as needed.
 */
exports.DEFAULT_LOG_OPTIONS = {
    level: exports.LOG_LEVEL,
    levelKey: 'level',
    replacer: !exports.LOG_EXPOSE_SECRETS ? hideSecrets : undefined,
    logHandler: exports.LOG_FORMAT === LogFormat.local ? localConsoleOutput : console,
    dev: exports.LOG_PRETTY_PRINT,
    // 'as any' because the types library is not updated for v3 of lambda-log
};
const _logOptions = { ...exports.DEFAULT_LOG_OPTIONS };
const _log = new Logger(_logOptions);
/**
 * If a log message will be suppressed because the log level is lower than that required
 * for the message, then it's a waste of time to generate the metadata object that accompanies
 * the log entry.
 *
 * This function will return `undefined` if the log message will be suppressed anyway, otherwise it will
 * run the function passed as `obj` to generate the object to include as metadata.
 *
 * Generally this should be used when the obj generation takes sufficiently long that it should
 * not be done unless it will be for sure output.
 *
 * Example:
 * ```
 * log.debug(
 *    'some message',
 *    defer(LogLevel.DEBUG, () => {
 *       thing: generate(),
 *       otherThing: moreWork(),
 *       bigThing: allocateBigObject(),
 *    }),
 * );
 * ```
 *
 * @param  {LogLevel} level this should be `LogLevel` corresponding to the `log.<level>(...)` call you are making
 * @param  {object|()=>object} obj normally, this should be a `() => object` however `object` is supported solely
 * to make it easier on development.  If you change what is needed to be passed in for a quick test you won't have
 * to re-write your log line to change between using `defer` or not
 * @returns object
 * @see {@link LogLevel}
 */
function defer(level, obj) {
    if (level > exports.log.options.level) {
        return undefined;
    }
    return typeof obj === 'function' ? obj() : obj;
}
exports.defer = defer;
/**
 * Used in JSON.stringify as the replacer function to hide known secret fields which should not be in logs
 *
 * @param  {any} key
 * @param  {any} value
 * @returns any
 */
function hideSecrets(key, value) {
    if (typeof key === 'string' && typeof value === 'string') {
        switch (key.toLowerCase()) {
            case 'client_secret': {
                return exports.HIDDEN_TEXT;
            }
            case 'access_token': {
                return exports.HIDDEN_TEXT;
            }
            case 'password': {
                return exports.HIDDEN_TEXT;
            }
        }
    }
    return value;
}
exports.hideSecrets = hideSecrets;
/**
 * Logging: log.info(string, any), log.warn(string, any), etc...
 *
 * Supported `env` Options (default value):
 *
 * * LOG_LEVEL: must be one of the {@link LogLevel} values
 * to control minimum log output.
 *
 * * LOG_EXPOSE_SECRETS (false): Set to `true` if you want to disable the
 * hiding of secret values in the logs (should only be done for debugging and
 * not on Production)
 *
 * * LOG_HIDE_XRAY_DEBUG (false): Set to `true` if you want to hide a bunch of
 * XRay debug log messages when you have the `LOG_LEVEL` set to `DEBUG`
 *
 * @see https://lambdalog.js.org/docs/getting-started/#usage for the underlying library info
 */
exports.log = _log;
//# sourceMappingURL=logger.js.map