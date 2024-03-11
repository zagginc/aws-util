"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareSQSRecordsById = exports.CleanUpRecord = exports.GetQueueUrl = exports.GetSQSQueueUrl = exports.EVENTSOURCE_SQS = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = require("../../logger");
const clients_1 = require("../clients");
exports.EVENTSOURCE_SQS = 'aws:sqs';
/**
 * Get the SQS Queue Url from the record's event source ARN
 *
 * @param  {SQSRecord} record
 * @param  {SQSClient} client
 * @returns GetQueueUrlCommandOutput
 * @deprecated see: {@link GetQueueUrl}
 */
async function GetSQSQueueUrl(record, client) {
    const QueueName = record.eventSourceARN.split(':')[5];
    const params = {
        QueueName,
    };
    const command = new client_sqs_1.GetQueueUrlCommand(params);
    const getQueueUrl = await client.send(command);
    return getQueueUrl;
}
exports.GetSQSQueueUrl = GetSQSQueueUrl;
let sqs;
/**
 * Lookup the URL for a Queue when you only have the Name of the queue available.
 *
 * @param  {string} QueueName
 * @returns Promise
 */
async function GetQueueUrl(QueueName) {
    var _a;
    sqs !== null && sqs !== void 0 ? sqs : (sqs = (0, clients_1.GetAWSClient)(client_sqs_1.SQSClient, { label: 'sqs-utilities' }));
    const QueueUrl = (_a = (await sqs.send(new client_sqs_1.GetQueueUrlCommand({
        QueueName,
    }))).QueueUrl) !== null && _a !== void 0 ? _a : '';
    if (!QueueUrl) {
        throw new Error(`QueueUrl not found for SQS Queue named: ${QueueName}`);
    }
    return QueueUrl;
}
exports.GetQueueUrl = GetQueueUrl;
/**
 * Call this after the SQSRecord is processed succesfully to remove it from it's Queue.
 * If the `SQSRecord` does not have an eventSource type of `aws:sqs`, this function will
 * not take an action but it will return `true`
 *
 * @param  {SQSRecord} record
 * @returns Promise
 */
async function CleanUpRecord(record, client) {
    if (record.eventSource === exports.EVENTSOURCE_SQS) {
        const sqsClient = client !== null && client !== void 0 ? client : (0, clients_1.GetAWSClient)(client_sqs_1.SQSClient, { label: 'sqs-utilities' });
        const queueUrl = await GetSQSQueueUrl(record, sqsClient);
        const { $metadata } = await sqsClient.send(new client_sqs_1.DeleteMessageCommand({
            QueueUrl: queueUrl.QueueUrl,
            ReceiptHandle: record.receiptHandle,
        }));
        if ($metadata.httpStatusCode === http_status_codes_1.StatusCodes.OK) {
            logger_1.log.info(`[${record.messageId}] deleted from queue ${record.eventSourceARN}`, { record });
            return true;
        }
        else {
            logger_1.log.error(`[${record.messageId}] ${$metadata.httpStatusCode} UNABLE to delete from queue ${record.eventSourceARN}`, { record, $metadata });
            return false;
        }
    }
    else {
        logger_1.log.info(`[${record.messageId}] Event Source (${record.eventSource}) is not '${exports.EVENTSOURCE_SQS}' so not deleting from queue.`, { record });
        return true;
    }
}
exports.CleanUpRecord = CleanUpRecord;
/**
 * Compare two `SQSRecord`s for sorting puposes by their `messageId`.
 * Returns -1, 1 or 0 as per normal comparisson functions to indicate sort order.
 *
 * @param  {SQSRecord} a
 * @param  {SQSRecord} b
 * @returns number
 */
function CompareSQSRecordsById(a, b) {
    if (a && !b) {
        return 1;
    }
    if (!a && b) {
        return -1;
    }
    if (!a && !b) {
        return 0;
    }
    if (a.messageId < b.messageId) {
        return -1;
    }
    if (a.messageId > b.messageId) {
        return 1;
    }
    return 0;
}
exports.CompareSQSRecordsById = CompareSQSRecordsById;
//# sourceMappingURL=sqs-utilities.js.map