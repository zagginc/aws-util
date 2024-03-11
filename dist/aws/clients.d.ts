type AWSClient = any;
/**
 * See: {@link GetAWSClient}
 */
export interface AWSClientConfig {
    /**
     * A name for this client.
     * Using the same name will retrieve the same instance of the client.
     */
    label: string;
    /**
     * Any parameters to pass to the constructor of the client.
     * This object will be passed exectly as-is.
     */
    params?: {
        [name: string]: any;
    };
    /**
     * If `true` any existing client with the `label` will have `destroy()`
     * called on it and be removed. A new instance will be returned.
     */
    forceNew?: boolean;
}
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
export declare function GetAWSClient<T extends AWSClient>(type: {
    new (...args: any[]): T;
}, config: AWSClientConfig): T;
export {};
//# sourceMappingURL=clients.d.ts.map