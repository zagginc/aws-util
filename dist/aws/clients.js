"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAWSClient = void 0;
// import { Client } from '@aws-sdk/types';
// import { Client as __Client } from '@aws-sdk/smithy-client';
const aws_xray_sdk_1 = require("aws-xray-sdk");
const _clients = new Map();
/**
 * Get a cached instance of an AWS Service Client (or create a new one if there is none cached).
 * This is the recommended way to access AWS Service Clients to optimize the performance of
 * a Lambda function. It will also automatically orchestrate the client if the `process.env._X_AMZN_TRACE_ID`
 * is set.
 *
 * WARNING: If you need to create clients for the same service for different regions, ensure you use different labels.
 * WARNING: ONLY the label is used to identify the cached clients. If you use different `params` in your request, they
 *          will not apply to the returned client unless you use the `forceNew` param.
 */
function GetAWSClient(type, config) {
    const { params, label, forceNew } = config;
    if (forceNew && _clients.has(label)) {
        const client = _clients.get(label);
        try {
            // !!! should _not_ need the `any` cast here but until the AWSClient type can be properly defined as Client<any,...> we need it
            client.destroy();
        }
        catch (err) {
        }
        finally {
            _clients.delete(label);
        }
    }
    if (_clients.has(label)) {
        return _clients.get(label);
    }
    let client = new type(params);
    if (process.env._X_AMZN_TRACE_ID) {
        // only capture for xray if running in lambda / a trace ID is set
        // note: 'as any' due to https://github.com/aws/aws-xray-sdk-node/issues/439
        client = (0, aws_xray_sdk_1.captureAWSv3Client)(client);
    }
    return client;
}
exports.GetAWSClient = GetAWSClient;
//# sourceMappingURL=clients.js.map