/**
 * Convert a Base64 encoded string into a UTF-8 (normal) string
 */
export declare const Base64Decode: (encoded: string) => string;
/**
 * Trim `prefix` from the start of `s` if `s` starts with `prefix`
 * Will return `s` unchanged prefix is not at the start of it or either input is falsy
 */
export declare const trimStart: (s: string, prefix: string) => string;
/**
 * Trim `suffix` from the end of `s` if `s` ends with `suffix`.
 * Will return `s` unchanged suffix is not on the end of it or either input is falsy
 */
export declare const trimEnd: (s: string, suffix: string) => string;
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
export declare function chunkArray<T>(items: T[], chunkSize: number): T[][];
//# sourceMappingURL=util.d.ts.map