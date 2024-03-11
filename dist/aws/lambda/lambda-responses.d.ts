/**
 * Response structure for Steam processing lambda functions where `FunctionResponseTypes`
 * for the function in CloudFormation is set to `ReportBatchItemFailures`
 *
 * EXAMPLE
 *
 * ```
 * const response: StreamsEventResponse = {
 *	   BatchItemFailures: [{ ItemIdentifier: 'asdf' }],
 * };
 * ```
 *
 */
export interface StreamsEventResponse {
    BatchItemFailures: {
        ItemIdentifier: string;
    }[];
}
//# sourceMappingURL=lambda-responses.d.ts.map