"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareKinesisRecords = void 0;
/**
 * Compare `KinesisStreamRecord`s and `KinesisStreamRecordPayload`s for use in sorting and
 * return -1, 0, 1 to enable the caller to sort the two items.
 *
 * @param  {KinesisStreamRecord | KinesisStreamRecordPayload} first
 * @param  {KinesisStreamRecord | KinesisStreamRecordPayload} second
 * @returns number -1, 0 or 1 if `first` is <, == or > `second`
 */
function CompareKinesisRecords(first, second) {
    var _a, _b;
    const a = (_a = first.kinesis) !== null && _a !== void 0 ? _a : first;
    const b = (_b = second.kinesis) !== null && _b !== void 0 ? _b : second;
    let result = a.partitionKey < b.partitionKey ? -1 : (a.partitionKey > b.partitionKey ? 1 : 0);
    if (result === 0) {
        result = a.sequenceNumber < b.sequenceNumber ? -1 : (a.sequenceNumber > b.sequenceNumber ? 1 : 0);
    }
    return result;
}
exports.CompareKinesisRecords = CompareKinesisRecords;
//# sourceMappingURL=kinesis-utilities.js.map