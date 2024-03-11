import { LambdaLog, LogMessage } from 'lambda-log';
import type { LambdaLogOptions } from 'lambda-log';
export declare enum LogFormat {
    local = "local",
    json = "json"
}
export declare enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3
}
/**
 * The string name of a LogLevel in lowercase.
 * These are all the valid values to use when deciding which log level a log message should be logged.
 */
export type LogLevelName = Lowercase<keyof typeof LogLevel>;
export declare const DEFAULT_LOG_LEVEL: string;
export declare const LOG_LEVEL: LogLevel;
export declare const HIDDEN_TEXT: string;
export declare const LOG_EXPOSE_SECRETS: boolean;
export declare const LOG_HIDE_XRAY_DEBUG: boolean;
export declare const DEFAULT_LOG_FORMAT: LogFormat;
export declare const LOG_FORMAT: LogFormat;
/**
 * **For NON-PRODUCTION ONLY**
 *
 * Set `process.env.LOG_PRETTY_PRINT` to output the JSON in human-readable indenting.
 */
export declare const LOG_PRETTY_PRINT: boolean;
type ConsoleLogFunction = (message?: any, ...optionalParams: any[]) => void;
export type ConsoleLoggerLike = Record<LogLevelName | 'log', ConsoleLogFunction>;
export interface ILoggerCommonMetadata {
    meta?: object | undefined;
    tags?: string[] | undefined;
}
export declare class Logger extends LambdaLog {
    #private;
    constructor(logOptions: LambdaLogOptions, additionalData?: ILoggerCommonMetadata);
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
    private shouldLogMessage;
    private static createShouldLogMessageFn;
    /**
     * Suppress log messages if they are above the maximum {@link LOG_LEVEL} defined.
     */
    private shouldLogLevel;
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
    log(level: LogLevelName, msg: unknown, meta?: object, tags?: string[]): LogMessage;
    /**
     * Loads and parses the call stack, grabs the appropriate frame and then loads in
     * the filename, function and column that the log event was called from.
    */
    private get callerMeta();
    /**
     * This was "borrowed" from https://github.com/sindresorhus/callsites because
     * importing it was proving challenging
    */
    private get callsite();
    /**
     * Fork the logger into a new instance, sharing the same options and shared meta and tags
     */
    fork(additionalData?: ILoggerCommonMetadata): Logger;
}
/**
 * The default values used by the exported {@link log}.
 *
 * If you are extending {@link Logger} you can use these as the default
 * options and override as needed.
 */
export declare const DEFAULT_LOG_OPTIONS: Readonly<LambdaLogOptions>;
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
export declare function defer(level: LogLevel, obj: object | (() => object)): object | undefined;
/**
 * Used in JSON.stringify as the replacer function to hide known secret fields which should not be in logs
 *
 * @param  {any} key
 * @param  {any} value
 * @returns any
 */
export declare function hideSecrets(key: any, value: any): any;
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
export declare const log: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map