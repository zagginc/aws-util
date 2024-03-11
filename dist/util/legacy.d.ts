/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isValid(value: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isInvalid(value: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isBoolean(value: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isValidNumber(n: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isInvalidNumber(n: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isEmptyString(value: any, trim?: boolean): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isNonEmptyString(value: any, trim?: boolean): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isEmptyArray(value: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isNonEmptyArray(data: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isObject(value: any, strict?: boolean): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isObjectStrict(value: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isEmptyObject(value: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isNonEmptyObject(value: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isFunction(func: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isRegularExpression(regExp: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isComment(data: any, comment: string): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isVisible(element: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isHidden(element: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isEnabled(element: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function isDisabled(element: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function parseBoolean(value: any, defaultValue?: boolean): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function parseInteger(value: any, defaultValue?: number): number;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function parseFloatingPointNumber(value: any, defaultValue?: number): number;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function parseDate(value: any): Date | undefined;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function parsePostalCode(value: string): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function parseEmail(value: string): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function parseEmailDomain(value: string): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function parseStringList(data: string): string[] | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function parseRegularExpression(data: string): RegExp | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function parseYouTubeLink(data: string): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function formatMoney(value: string | number, isDollars?: boolean, displayCentsIfZero?: boolean): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function trimString(value: string, defaultValue?: string): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function trimWhitespace(string: string, trimNewlines?: boolean): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function replaceNonBreakingSpaces(string: string): string;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function createError(message: string, status: number): Error;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function addLeadingZeroes(value: any, expectedLength: number): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function appendSlash(path: string): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function calculateAge(date: any): number;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function clone(object: any | null | undefined, throwUnsupported?: boolean | undefined): any;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function compareCasePercentage(text: string): number;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function compareDates(dateA: any, dateB: any): number;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function createQueryString(data: {
    [x: string]: string | number | boolean;
}, includeQuestionMark: boolean): string;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function createRange(start: any, end: any): number[];
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function formatMessage(message: any | any[]): any;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function formatObject(object: {
    [x: string]: any;
    arrayElement?: any;
}, format: {
    arrayElement: any;
}, removeExtra: any, throwErrors?: boolean, copyUnsupported?: boolean, preprocessor?: boolean, postprocessor?: boolean): any;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function formatSimpleDate(date: any, options: {
    comma: any;
}): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function formatStringList(initialData: string | string[]): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function futureMonths(date: {
    getFullYear: () => number;
}): string[];
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function getDateString(date: Date): string;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function indentParagraph(paragraph: string, amount: any, indent: any, clearEmptyLines: any): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function joinPaths(base: string, path: string): string;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function matchAttribute(element: {
    [x: string]: any;
}, attribute: string | number, value: any): boolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function merge(a: any, b: {
    [x: string]: any;
}, copy?: boolean, deepMerge?: boolean): any;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function prependSlash(path: string): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function reverseString(data: string | any[]): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function toCamelCase(value: string, prefix?: string, suffix?: string): string;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function toTitleCase(value: string): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function toString(value: number | Date | null | undefined): string;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function trimLeadingZeroes(value: string): string | null;
/**
 * @deprecated This is a legacy util and should not be used.
 */
export declare function toProperCase(value: string, prefix?: string, suffix?: string): string;
//# sourceMappingURL=legacy.d.ts.map