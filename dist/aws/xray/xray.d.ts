import type { Context } from 'aws-lambda';
import { Segment, Subsegment } from 'aws-xray-sdk';
import type { Logger as XRayLogger } from 'aws-xray-sdk';
/**
 * Enable AWS XRay on all `https` connections and `Promise`-based http connection responses.
 * Set the logger for XRay to use.
 *
 * Additional XRay configuration available via `env` variables such as
 * * `AWS_XRAY_DEBUG_MODE`
 * * `AWS_XRAY_LOG_LEVEL`
 * * `AWS_XRAY_CONTEXT_MISSING`
 *
 * @see https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-nodejs-configuration.html#xray-sdk-nodejs-configuration-logging
 */
export declare function EnableAWSXRay(logger?: XRayLogger | undefined): void;
/**
 * Generic Lambda Handler type definition for a Handler which accepts a `Segment`
 * parameter after XRay is enabled.
 */
export type Handler<TEvent = any, TResult = any | void> = (event: TEvent, context: Context, segment?: Subsegment | Segment) => Promise<TResult>;
/**
 * Determines if XRay should be enabled or not by reading `process.env.ENABLE_XRAY`.
 *
 * To disable XRay, use "`false`" for the `ENABLE_XRAY` environment variable.
 *
 * Default: `true`
 */
export declare const ENABLE_XRAY: boolean;
/**
* Reads the `ENABLE_XRAY` environment variable and returns either a handler reference
* that has been wrapped with {@link EnableAWSXRayOnHandler}, or the handler reference (unmodified)
* if xray is not enabled.
*
* If using this wrapper, you do NOT need to call {@link EnableAWSXRay} as it will be called for you
* if your handler gets wrapped with xray.
*
* @see {@link EnableAWSXRayOnHandler}
*/
export declare const AWSXRayHandlerWrapper: <TEvent, TResult>(handler: Handler<TEvent, TResult>) => Handler<TEvent, TResult>;
export interface IXRayAttribute {
    name: string;
    data: any;
}
export interface IXRayMetadata {
    key: string;
    value: any;
    namespace?: string;
}
export interface IXRayAnnotation {
    key: string;
    value: boolean | string | number;
}
export interface ITraceConfig {
    /**
     * By defauly, any exceptions are added to the subsegment via `addError`.
     * If you would prefer that not happen, set this to `true`
     */
    IgnoreError?: boolean;
    /**
     * The current {@link Segment} or {@link Subsegment} to which a new Subsegment
     * will be created for this trace.
     */
    Segment?: Subsegment | Segment;
    /**
     * Documentation is unclear about the use case for Attributes.
     *
     * Unless you know why you are using them, you probably should use
     * {@link ITraceConfig.Annotations} or {@link ITraceConfig.Metadata}
     */
    Attributes?: IXRayAttribute[];
    /**
     * Metadata are key-value pairs that can have values of any type, including objects and lists,
     * but are not indexed for use with filter expressions. Use metadata to record additional data
     * that you want stored in the trace but don't need to use with search.
     *
     * *Annotations and metadata are arbitrary text that you add to segments with the X-Ray SDK.
     * Annotations are indexed for use with filter expressions. Metadata are not indexed, but can
     * be viewed in the raw segment with the X-Ray console or API. Anyone that you grant read
     * access to X-Ray can view this data.*
     *
     * @see https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-nodejs-segment.html#xray-sdk-nodejs-segment-metadata
     */
    Metadata?: IXRayMetadata[];
    /**
     * Annotations are key-value pairs with string, number, or Boolean values. Annotations are
     * indexed for use with filter expressions. Use annotations to record data that you want to
     * use to group traces in the console, or when calling the GetTraceSummaries API.
     *
     * @see https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-nodejs-segment.html#xray-sdk-nodejs-segment-annotations
     */
    Annotations?: IXRayAnnotation[];
}
/**
 * Creates a new Subsegment called `label` and then calls the `target` function.
 * Once the function completes, the `Subsegment` is closed. `config` provides
 * support to add specific annotations and metadata to this new Subsegment.
 *
 * If {@link ENABLE_XRAY} is `false`, the target is returned without being traced.
 *
 * @param  {string} label the name of the subsegment to create
 * @param  {()=>Promise<any>} target an async Promise-based function which is to be traced
 * @param  {ITraceConfig} config metadata and configuration to apply to this trace event.
 * @returns the result of the target function (if traced), or the target function (if tracing is skipped)
 */
export declare function Trace<T = any>(label: string, target: () => Promise<T>, config?: ITraceConfig): Promise<T>;
type ILambdaTraceConfig = Pick<ITraceConfig, 'Attributes' | 'Metadata' | 'Annotations'> & {
    Label?: string;
};
/**
 * Utility function to add all the `Metadata` & `Annotations` in the provided `config` to the `segment`.
 * If the `segment` is a {@link Subsegment} then any `Attributes` in the config will be applied as well.
 *
 * @param config defines the `Annotations`, `Metadata` and `Attributes` (all optional) to apply to the `segment`
 * @param segment the `Segment` or `Subsegment` to apply the `config` properties to. If this is not provided, the current segment from {@link AWSXRay.getSegment} will be used.
 * @returns
 */
export declare function ApplyTraceProperties(config: Readonly<ILambdaTraceConfig>, segment: Subsegment | Segment): void;
export {};
//# sourceMappingURL=xray.d.ts.map