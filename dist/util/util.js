"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkArray = exports.trimEnd = exports.trimStart = exports.Base64Decode = void 0;
/**
 * Convert a Base64 encoded string into a UTF-8 (normal) string
 */
const Base64Decode = (encoded) => Buffer.from(encoded, 'base64').toString('utf-8');
exports.Base64Decode = Base64Decode;
/**
 * Trim `prefix` from the start of `s` if `s` starts with `prefix`
 * Will return `s` unchanged prefix is not at the start of it or either input is falsy
 */
const trimStart = (s, prefix) => {
    var _a, _b;
    if (!s || !prefix) {
        return s;
    }
    if (!s.startsWith(prefix)) {
        return s;
    }
    return (_b = (_a = s.split(prefix, 2)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : s;
};
exports.trimStart = trimStart;
/**
 * Trim `suffix` from the end of `s` if `s` ends with `suffix`.
 * Will return `s` unchanged suffix is not on the end of it or either input is falsy
 */
const trimEnd = (s, suffix) => {
    if (!s || !suffix) {
        return s;
    }
    if (!s.endsWith(suffix)) {
        return s;
    }
    return s.substr(0, s.length - suffix.length);
};
exports.trimEnd = trimEnd;
/**
 * Returns an array with arrays of the given size.
 *
 * For example, split a 100 item array into 10 arrays with 10 items in each.
 *
 * *THIS MUTATES THE INPUT ARRAY*
 *
 * @param items the array to split into chunks. This array IS MUTATED and will not be usable after calling this function.
 * @param chunkSize the number of items to include in each chunk
 * @returns
 */
function chunkArray(items, chunkSize) {
    const results = [];
    if (chunkSize === 0) {
        return results;
    }
    while ((items === null || items === void 0 ? void 0 : items.length) > 0) {
        results.push(items.splice(0, chunkSize));
    }
    return results;
}
exports.chunkArray = chunkArray;
//# sourceMappingURL=util.js.map