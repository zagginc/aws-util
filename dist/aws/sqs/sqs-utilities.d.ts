import { SQSClient, GetQueueUrlCommandOutput } from '@aws-sdk/client-sqs';
import type { SQSRecord } from 'aws-lambda';
export declare const EVENTSOURCE_SQS: string;
/**
 * Get the SQS Queue Url from the record's event source ARN
 *
 * @param  {SQSRecord} record
 * @param  {SQSClient} client
 * @returns GetQueueUrlCommandOutput
 * @deprecated see: {@link GetQueueUrl}
 */
export declare function GetSQSQueueUrl(record: SQSRecord, client: SQSClient): Promise<GetQueueUrlCommandOutput>;
/**
 * Lookup the URL for a Queue when you only have the Name of the queue available.
 *
 * @param  {string} QueueName
 * @returns Promise
 */
export declare function GetQueueUrl(QueueName: string): Promise<string>;
/**
 * Call this after the SQSRecord is processed succesfully to remove it from it's Queue.
 * If the `SQSRecord` does not have an eventSource type of `aws:sqs`, this function will
 * not take an action but it will return `true`
 *
 * @param  {SQSRecord} record
 * @returns Promise
 */
export declare function CleanUpRecord(record: SQSRecord, client?: SQSClient): Promise<boolean>;
/**
 * Compare two `SQSRecord`s for sorting puposes by their `messageId`.
 * Returns -1, 1 or 0 as per normal comparisson functions to indicate sort order.
 *
 * @param  {SQSRecord} a
 * @param  {SQSRecord} b
 * @returns number
 */
export declare function CompareSQSRecordsById(a: SQSRecord, b: SQSRecord): number;
//# sourceMappingURL=sqs-utilities.d.ts.map