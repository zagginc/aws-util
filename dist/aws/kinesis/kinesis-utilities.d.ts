import type { KinesisStreamRecord, KinesisStreamRecordPayload } from 'aws-lambda';
/**
 * Compare `KinesisStreamRecord`s and `KinesisStreamRecordPayload`s for use in sorting and
 * return -1, 0, 1 to enable the caller to sort the two items.
 *
 * @param  {KinesisStreamRecord | KinesisStreamRecordPayload} first
 * @param  {KinesisStreamRecord | KinesisStreamRecordPayload} second
 * @returns number -1, 0 or 1 if `first` is <, == or > `second`
 */
export declare function CompareKinesisRecords(first: KinesisStreamRecord | KinesisStreamRecordPayload, second: KinesisStreamRecord | KinesisStreamRecordPayload): number;
//# sourceMappingURL=kinesis-utilities.d.ts.map