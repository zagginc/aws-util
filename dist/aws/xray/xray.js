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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyTraceProperties = exports.Trace = exports.AWSXRayHandlerWrapper = exports.ENABLE_XRAY = exports.EnableAWSXRay = void 0;
const aws_xray_sdk_1 = require("aws-xray-sdk");
const AWSXRay = __importStar(require("aws-xray-sdk"));
const logger_1 = require("../../logger");
// Track if XRay has already been enabled so that we don't bother trying to call the capture* functions again
let xrayAlreadyEnabled = false;
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
function EnableAWSXRay(logger) {
    AWSXRay.setLogger(logger !== null && logger !== void 0 ? logger : logger_1.log);
    if (!xrayAlreadyEnabled) {
        AWSXRay.captureHTTPsGlobal(require('https'), true);
        AWSXRay.captureHTTPsGlobal(require('http'), true);
        AWSXRay.capturePromise();
        xrayAlreadyEnabled = true;
        logger_1.log.debug('AWS XRay Enabled');
    }
    else {
        logger_1.log.debug('AWS XRay Already Enabled');
    }
}
exports.EnableAWSXRay = EnableAWSXRay;
/**
 * Enables XRay and passes the current Segment to the `handler` which can be used to
 * create Subsegments for additional tracing, or to add additional metadata, annotations, etc.
 * onto the current trace.
 *
 * **If using this wrapper, you do NOT need to call {@link EnableAWSXRay} as it will be called for you.**
 *
 * @see {@link Handler}
 * @see {@link AWSXRayHandlerWrapper}
 */
const EnableAWSXRayOnHandler = (handler) => (event, context) => {
    EnableAWSXRay();
    const segment = AWSXRay === null || AWSXRay === void 0 ? void 0 : AWSXRay.getSegment();
    return handler(event, context, segment);
};
/**
 * Determines if XRay should be enabled or not by reading `process.env.ENABLE_XRAY`.
 *
 * To disable XRay, use "`false`" for the `ENABLE_XRAY` environment variable.
 *
 * Default: `true`
 */
exports.ENABLE_XRAY = (process.env.ENABLE_XRAY || 'true') === 'true';
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
const AWSXRayHandlerWrapper = (handler) => exports.ENABLE_XRAY ? EnableAWSXRayOnHandler(handler) : handler;
exports.AWSXRayHandlerWrapper = AWSXRayHandlerWrapper;
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
async function Trace(label, target, config) {
    var _a;
    if (!exports.ENABLE_XRAY) {
        return target();
    }
    config = {
        IgnoreError: false,
        ...config,
    };
    const subsegment = (_a = (config.Segment || AWSXRay.getSegment())) === null || _a === void 0 ? void 0 : _a.addNewSubsegment(label);
    if (subsegment) {
        ApplyTraceProperties(config, subsegment);
    }
    try {
        return await target();
    }
    catch (error) {
        if (config.IgnoreError === false) {
            subsegment === null || subsegment === void 0 ? void 0 : subsegment.addError(error);
        }
        throw error;
    }
    finally {
        if (subsegment && !subsegment.isClosed()) {
            subsegment.close();
        }
    }
}
exports.Trace = Trace;
/**
 * Utility function to add all the `Metadata` & `Annotations` in the provided `config` to the `segment`.
 * If the `segment` is a {@link Subsegment} then any `Attributes` in the config will be applied as well.
 *
 * @param config defines the `Annotations`, `Metadata` and `Attributes` (all optional) to apply to the `segment`
 * @param segment the `Segment` or `Subsegment` to apply the `config` properties to. If this is not provided, the current segment from {@link AWSXRay.getSegment} will be used.
 * @returns
 */
function ApplyTraceProperties(config, segment) {
    if (!exports.ENABLE_XRAY || !config || !segment) {
        return;
    }
    const { Attributes, Metadata, Annotations } = config;
    if (segment instanceof aws_xray_sdk_1.Subsegment) {
        Attributes === null || Attributes === void 0 ? void 0 : Attributes.forEach((a) => segment.addAttribute(a.name, a.data));
    }
    Metadata === null || Metadata === void 0 ? void 0 : Metadata.forEach((m) => segment.addMetadata(m.key, m.value, m.namespace));
    Annotations === null || Annotations === void 0 ? void 0 : Annotations.forEach((a) => segment.addAnnotation(a.key, a.value));
}
exports.ApplyTraceProperties = ApplyTraceProperties;
//# sourceMappingURL=xray.js.map