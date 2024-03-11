"use strict";
/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* eslint-disable prefer-named-capture-group */
/* eslint-disable no-magic-numbers */
/* eslint-disable require-jsdoc */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indentParagraph = exports.getDateString = exports.futureMonths = exports.formatStringList = exports.formatSimpleDate = exports.formatObject = exports.formatMessage = exports.createRange = exports.createQueryString = exports.compareDates = exports.compareCasePercentage = exports.clone = exports.calculateAge = exports.appendSlash = exports.addLeadingZeroes = exports.createError = exports.replaceNonBreakingSpaces = exports.trimWhitespace = exports.trimString = exports.formatMoney = exports.parseYouTubeLink = exports.parseRegularExpression = exports.parseStringList = exports.parseEmailDomain = exports.parseEmail = exports.parsePostalCode = exports.parseDate = exports.parseFloatingPointNumber = exports.parseInteger = exports.parseBoolean = exports.isDisabled = exports.isEnabled = exports.isHidden = exports.isVisible = exports.isComment = exports.isRegularExpression = exports.isFunction = exports.isNonEmptyObject = exports.isEmptyObject = exports.isObjectStrict = exports.isObject = exports.isNonEmptyArray = exports.isEmptyArray = exports.isNonEmptyString = exports.isEmptyString = exports.isInvalidNumber = exports.isValidNumber = exports.isBoolean = exports.isInvalid = exports.isValid = void 0;
exports.toProperCase = exports.trimLeadingZeroes = exports.toString = exports.toTitleCase = exports.toCamelCase = exports.reverseString = exports.prependSlash = exports.merge = exports.matchAttribute = exports.joinPaths = void 0;
const change_case_1 = __importDefault(require("change-case"));
const regularExpressionRegExp = /\s*\/(.*)\/(.*)\s*/;
const postalCodeRegExp = /[ \t]*([A-Z][0-9][A-Z])[_\- \t]?([0-9][A-Z][0-9])[ \t]*/i;
const emailRegExp = /([^+@]+)(\+.*)?(@.+\..+)/;
const emailDomainRegExp = /([^+@]+)(\+.*)?@(.+\..+)/;
const youTubeLinkRegExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/i;
const youTubeVideoIDRegExp = /[A-Z0-9_-]{11,}/i;
const leadingSlashRegExp = /^[\/\\]+/;
const trailingSlashRegExp = /[\/\\]+$/;
const lowerCaseWords = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
const upperCaseWords = ['Id', 'Tv', 'Atm'];
const months = [
    {
        id: 'JA',
        name: 'January',
        short: 'Jan',
        days: 31,
    },
    {
        id: 'FE',
        name: 'February',
        short: 'Feb',
        days: 28,
    },
    {
        id: 'MR',
        name: 'March',
        short: 'Mar',
        days: 31,
    },
    {
        id: 'AP',
        name: 'April',
        short: 'Apr',
        days: 30,
    },
    {
        id: 'MY',
        name: 'May',
        short: 'May',
        days: 31,
    },
    {
        id: 'JN',
        name: 'June',
        short: 'Jun',
        days: 30,
    },
    {
        id: 'JL',
        name: 'July',
        short: 'Jul',
        days: 31,
    },
    {
        id: 'AU',
        name: 'August',
        short: 'Aug',
        days: 31,
    },
    {
        id: 'SE',
        name: 'September',
        short: 'Sep',
        days: 30,
    },
    {
        id: 'OC',
        name: 'October',
        short: 'Oct',
        days: 31,
    },
    {
        id: 'NV',
        name: 'November',
        short: 'Nov',
        days: 30,
    },
    {
        id: 'DE',
        name: 'December',
        short: 'Dec',
        days: 31,
    },
];
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isValid(value) {
    return value !== undefined && value !== null;
}
exports.isValid = isValid;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isInvalid(value) {
    return !isValid(value);
}
exports.isInvalid = isInvalid;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isBoolean(value) {
    return value === true || value === false;
}
exports.isBoolean = isBoolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isValidNumber(n) {
    return typeof n === 'number' && !isNaN(n) && n !== -Infinity && n !== Infinity;
}
exports.isValidNumber = isValidNumber;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isInvalidNumber(n) {
    return !isValidNumber(n);
}
exports.isInvalidNumber = isInvalidNumber;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isEmptyString(value, trim) {
    return typeof value !== 'string' || (parseBoolean(trim, true) ? value.trim().length === 0 : value.length === 0);
}
exports.isEmptyString = isEmptyString;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isNonEmptyString(value, trim) {
    return !isEmptyString(value, trim);
}
exports.isNonEmptyString = isNonEmptyString;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isEmptyArray(value) {
    if (isInvalid(value)) {
        return true;
    }
    if (!Array.isArray(value)) {
        return false;
    }
    return value.length === 0;
}
exports.isEmptyArray = isEmptyArray;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isNonEmptyArray(data) {
    return Array.isArray(data) && data.length !== 0;
}
exports.isNonEmptyArray = isNonEmptyArray;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isObject(value, strict) {
    return value !== undefined && (strict ? value !== null && value.constructor === Object : value instanceof Object && !(value instanceof Function));
}
exports.isObject = isObject;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isObjectStrict(value) {
    return value !== undefined && value !== null && value.constructor === Object;
}
exports.isObjectStrict = isObjectStrict;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isEmptyObject(value) {
    return value !== undefined && value !== null && value.constructor === Object && Object.keys(value).length === 0;
}
exports.isEmptyObject = isEmptyObject;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isNonEmptyObject(value) {
    return !isEmptyObject(value);
}
exports.isNonEmptyObject = isNonEmptyObject;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isFunction(func) {
    return func instanceof Function;
}
exports.isFunction = isFunction;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isRegularExpression(regExp) {
    return regExp instanceof RegExp;
}
exports.isRegularExpression = isRegularExpression;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isComment(data, comment) {
    if (isEmptyString(data)) {
        return false;
    }
    if (isEmptyString(comment)) {
        comment = '//';
    }
    let commentStartIndex = -1;
    for (let i = 0; i < data.length; i++) {
        if (data[i] === ' ' || data[i] == '\t') {
            continue;
        }
        if (data[i] == comment[0]) {
            commentStartIndex = i;
            break;
        }
        else {
            return false;
        }
    }
    if (commentStartIndex < 0 || data.length - commentStartIndex < comment.length) {
        return false;
    }
    for (let i = commentStartIndex; i < data.length; i++) {
        if (i - commentStartIndex >= comment.length) {
            break;
        }
        if (data[i] != comment[i - commentStartIndex]) {
            return false;
        }
    }
    return true;
}
exports.isComment = isComment;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isVisible(element) {
    if (!isObject(element)) {
        return false;
    }
    if (isFunction(element.visible)) {
        return element.visible();
    }
    else if (isBoolean(element.visible)) {
        return element.visible;
    }
    else if (isFunction(element.hidden)) {
        return !element.hidden();
    }
    else if (isBoolean(element.hidden)) {
        return !element.hidden;
    }
    return true;
}
exports.isVisible = isVisible;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isHidden(element) {
    return !isVisible(element);
}
exports.isHidden = isHidden;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isEnabled(element) {
    if (!isObject(element)) {
        return false;
    }
    if (isFunction(element.enabled)) {
        return element.enabled();
    }
    else if (isBoolean(element.enabled)) {
        return element.enabled;
    }
    else if (isFunction(element.disabled)) {
        return !element.disabled();
    }
    else if (isBoolean(element.disabled)) {
        return !element.disabled;
    }
    return true;
}
exports.isEnabled = isEnabled;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function isDisabled(element) {
    return !isEnabled(element);
}
exports.isDisabled = isDisabled;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function parseBoolean(value, defaultValue) {
    if (isBoolean(value)) {
        return value;
    }
    if (typeof defaultValue !== 'boolean') {
        defaultValue = false;
    }
    if (value === undefined || value === null) {
        return defaultValue;
    }
    if (value === 0) {
        return false;
    }
    if (value === 1) {
        return true;
    }
    if (typeof value !== 'string') {
        return defaultValue;
    }
    const temp = value.trim().toLowerCase();
    if (temp.length === 0) {
        return defaultValue;
    }
    if (temp.length === 1) {
        if (temp.charAt(0) === 't' || temp.charAt(0) === 'y') {
            return true;
        }
        else if (temp.charAt(0) === 'f' || temp.charAt(0) === 'n') {
            return false;
        }
        else if (temp.charAt(0) === '0') {
            return false;
        }
        else if (temp.charAt(0) === '1') {
            return true;
        }
        return defaultValue;
    }
    else {
        if (temp === 'true' || temp === 'yes' || temp === 'on') {
            return true;
        }
        else if (temp === 'false' || temp === 'no' || temp === 'off') {
            return false;
        }
        return defaultValue;
    }
}
exports.parseBoolean = parseBoolean;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function parseInteger(value, defaultValue) {
    let newValue = NaN;
    if (typeof value === 'number') {
        newValue = value;
    }
    else if (typeof value === 'string') {
        newValue = parseInt(value);
    }
    if (isNaN(newValue) && typeof defaultValue === 'number') {
        return defaultValue;
    }
    return newValue;
}
exports.parseInteger = parseInteger;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function parseFloatingPointNumber(value, defaultValue) {
    let newValue = NaN;
    if (typeof value === 'number') {
        newValue = value;
    }
    else if (typeof value === 'string') {
        newValue = parseFloat(value);
    }
    if (isNaN(newValue) && typeof defaultValue === 'number') {
        return defaultValue;
    }
    return newValue;
}
exports.parseFloatingPointNumber = parseFloatingPointNumber;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function parseDate(value) {
    if (typeof value === 'number') {
        if (isNaN(value)) {
            return undefined;
        }
        const formattedValue = Math.floor(value);
        return new Date(formattedValue);
    }
    else if (typeof value === 'string') {
        const formattedValue = value.trim();
        if (formattedValue.length === 0) {
            return undefined;
        }
        let timestamp = null;
        if (!isNaN(parseInt(formattedValue))) {
            timestamp = parseInt(formattedValue);
        }
        else {
            timestamp = Date.parse(formattedValue);
        }
        if (isNaN(timestamp)) {
            return undefined;
        }
        return new Date(timestamp);
    }
    else if (value instanceof Date) {
        return value;
    }
    return undefined;
}
exports.parseDate = parseDate;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function parsePostalCode(value) {
    if (isEmptyString(value)) {
        return null;
    }
    const postalCodeData = value.match(postalCodeRegExp);
    if (!postalCodeData) {
        return null;
    }
    return postalCodeData[1] + postalCodeData[2];
}
exports.parsePostalCode = parsePostalCode;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function parseEmail(value) {
    if (isEmptyString(value)) {
        return null;
    }
    const trimmedEmail = value.trim().toLowerCase();
    const data = trimmedEmail.match(emailRegExp);
    if (data === null || data === undefined || data.length < 4) {
        return null;
    }
    return data[1] + data[3];
}
exports.parseEmail = parseEmail;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function parseEmailDomain(value) {
    if (isEmptyString(value)) {
        return null;
    }
    const trimmedEmail = value.trim().toLowerCase();
    const data = trimmedEmail.match(emailDomainRegExp);
    if (data === null || data === undefined || data.length < 4) {
        return null;
    }
    return data[3];
}
exports.parseEmailDomain = parseEmailDomain;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function parseStringList(data) {
    if (typeof data !== 'string') {
        return null;
    }
    if (data.length === 0) {
        return [];
    }
    const list = data.split(/[;,]+/);
    const formattedList = [];
    let formattedValue = null;
    for (let i = 0; i < list.length; i++) {
        formattedValue = list[i].trim();
        if (formattedValue.length === 0) {
            continue;
        }
        formattedList.push(formattedValue);
    }
    return formattedList;
}
exports.parseStringList = parseStringList;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function parseRegularExpression(data) {
    if (isEmptyString(data)) {
        return null;
    }
    const formattedData = data.match(regularExpressionRegExp);
    if (!formattedData) {
        return null;
    }
    return new RegExp(formattedData[1], formattedData[2]);
}
exports.parseRegularExpression = parseRegularExpression;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function parseYouTubeLink(data) {
    if (isEmptyString(data)) {
        return null;
    }
    const formattedData = data.trim();
    const match = formattedData.match(youTubeLinkRegExp);
    if (match && match[1].length >= 11) {
        return match[1];
    }
    if (formattedData.match(youTubeVideoIDRegExp)) {
        return formattedData;
    }
    return null;
}
exports.parseYouTubeLink = parseYouTubeLink;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function formatMoney(value, isDollars, displayCentsIfZero) {
    let money = value;
    if (typeof value === 'string') {
        money = parseFloatingPointNumber(value.replace(/\$/, ''));
    }
    if (typeof money !== 'number' || isNaN(money) || money < 0) {
        return null;
    }
    if (isDollars !== true) {
        money /= 100;
    }
    const cents = '.' + (money % 1).toFixed(2).substring(2);
    return '$' + Math.floor(money).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (displayCentsIfZero !== true || cents !== '.00' ? cents : '');
}
exports.formatMoney = formatMoney;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function trimString(value, defaultValue) {
    if (typeof value !== 'string') {
        return defaultValue === undefined ? null : defaultValue;
    }
    return value.trim();
}
exports.trimString = trimString;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function trimWhitespace(string, trimNewlines) {
    if (typeof string !== 'string') {
        return null;
    }
    let trimmedString = string.replace(/^[ \t]+|[ \t]+$/gm, '');
    let formattedTrimNewlines = parseBoolean(trimNewlines);
    if (formattedTrimNewlines === null) {
        formattedTrimNewlines = false;
    }
    if (formattedTrimNewlines) {
        trimmedString = trimmedString.replace(/\r\n?|\n/g, '');
    }
    return trimmedString;
}
exports.trimWhitespace = trimWhitespace;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function replaceNonBreakingSpaces(string) {
    if (typeof string !== 'string') {
        return string;
    }
    return string.replace(/&nbsp;/gi, ' ');
}
exports.replaceNonBreakingSpaces = replaceNonBreakingSpaces;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function createError(message, status) {
    const error = new Error(message);
    error.status = parseInteger(status, 500);
    return error;
}
exports.createError = createError;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function addLeadingZeroes(value, expectedLength) {
    if (isInvalid(value)) {
        return null;
    }
    let data = value.toString();
    expectedLength = parseInteger(expectedLength);
    if (isNaN(expectedLength) || expectedLength < 0) {
        return data;
    }
    const numberOfZeroes = expectedLength - data.length;
    for (let i = 0; i < numberOfZeroes; i++) {
        data = '0' + data;
    }
    return data;
}
exports.addLeadingZeroes = addLeadingZeroes;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function appendSlash(path) {
    if (typeof path !== 'string') {
        return null;
    }
    let data = path.trim();
    if (data.length === 0) {
        return data;
    }
    if (data[data.length - 1] !== '/' && data[data.length - 1] !== '\\') {
        data += '/';
    }
    return data;
}
exports.appendSlash = appendSlash;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function calculateAge(date) {
    const currentDate = new Date();
    const formattedDate = parseDate(date);
    if (!formattedDate || formattedDate > currentDate) {
        return -1;
    }
    return Math.floor(((currentDate.getTime() - formattedDate.getTime()) / 1000 / (60 * 60 * 24)) / 365.25);
}
exports.calculateAge = calculateAge;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function clone(object, throwUnsupported) {
    const formattedThrowUnsupported = parseBoolean(throwUnsupported, true);
    let copy;
    if (!isObject(object)) {
        return object;
    }
    if (object instanceof Date) {
        copy = new Date();
        copy.setTime(object.getTime());
        return copy;
    }
    if (object instanceof Array) {
        copy = [];
        for (let i = 0, length = object.length; i < length; i++) {
            copy[i] = clone(object[i], formattedThrowUnsupported);
        }
        return copy;
    }
    if (object instanceof Set) {
        return new Set(object);
    }
    if (object instanceof Map) {
        return new Map(object);
    }
    if (typeof Buffer !== 'undefined' && object instanceof Buffer) {
        return new Buffer(object);
    }
    if (object instanceof Object) {
        if (object instanceof Error) {
            copy = new Error(object.message);
        }
        else {
            copy = {};
        }
        for (const attribute in object) {
            if (object.hasOwnProperty(attribute)) {
                copy[attribute] = clone(object[attribute], formattedThrowUnsupported);
            }
        }
        return copy;
    }
    if (formattedThrowUnsupported) {
        throw new Error('Unable to copy object, type not supported!');
    }
    else {
        return object;
    }
}
exports.clone = clone;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function compareCasePercentage(text) {
    if (isEmptyString(text)) {
        return 0;
    }
    let upper = 0;
    let lower = 0;
    const lowerA = 'a'.charCodeAt(0);
    const lowerZ = 'z'.charCodeAt(0);
    const upperA = 'A'.charCodeAt(0);
    const upperZ = 'Z'.charCodeAt(0);
    for (let i = 0; i < text.length; i++) {
        if (text.charCodeAt(i) >= lowerA && text.charCodeAt(i) <= lowerZ) {
            lower++;
        }
        else if (text.charCodeAt(i) >= upperA && text.charCodeAt(i) <= upperZ) {
            upper++;
        }
    }
    return upper - lower;
}
exports.compareCasePercentage = compareCasePercentage;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function compareDates(dateA, dateB) {
    const formattedDateA = parseDate(dateA);
    const formattedDateB = parseDate(dateB);
    if (formattedDateA === undefined && formattedDateB === undefined) {
        return 0;
    }
    if (formattedDateA === undefined) {
        return -1;
    }
    if (formattedDateB === undefined) {
        return 1;
    }
    return formattedDateA.getTime() - formattedDateB.getTime();
}
exports.compareDates = compareDates;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function createQueryString(data, includeQuestionMark) {
    return !isObject(data) ? '' : (includeQuestionMark === true ? '?' : '') + Object.keys(data).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
}
exports.createQueryString = createQueryString;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function createRange(start, end) {
    let formattedStart = parseInteger(start);
    let formattedEnd = parseInteger(end);
    if (isNaN(formattedEnd)) {
        formattedEnd = formattedStart;
        formattedStart = 0;
    }
    if (isNaN(formattedStart) || isNaN(formattedEnd) || formattedStart > formattedEnd) {
        return [];
    }
    const range = [];
    for (let i = formattedStart; i <= formattedEnd; i++) {
        range.push(i);
    }
    return range;
}
exports.createRange = createRange;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function formatMessage(message) {
    if (isInvalid(message)) {
        return message;
    }
    var formattedMessage = message;
    if (isObject(message)) {
        if (Array.isArray(message)) {
            formattedMessage = [];
            for (var i = 0; i < message.length; i++) {
                formattedMessage.push(formatMessage(message[i]));
            }
            return formattedMessage;
        }
        else if (message instanceof Date) {
            return message.toString();
        }
        else {
            if (isValid(message.details)) {
                if (isObject(message.details)) {
                    if (isObject(message.details.messages)) {
                        const messages = message.details.messages;
                        const messageTypes = Object.keys(messages);
                        formattedMessage = [];
                        for (var i = 0; i < messageTypes.length; i++) {
                            if (isNonEmptyArray(messages[messageTypes[i]])) {
                                for (let j = 0; j < messages[messageTypes[i]].length; j++) {
                                    formattedMessage.push(formatMessage(((messages[messageTypes[i]][j].toLowerCase().startsWith(messageTypes[i].toLowerCase())) ? '' : messageTypes[i] + ' ') + messages[messageTypes[i]][j]));
                                }
                            }
                            else {
                                formattedMessage.push(formatMessage(((toString(messages[messageTypes[i]]).toLowerCase().startsWith(messageTypes[i].toLowerCase())) ? '' : messageTypes[i] + ' ') + toString(messages[messageTypes[i]])));
                            }
                        }
                        return formattedMessage;
                    }
                    else {
                        if (isNonEmptyString(message.message)) {
                            formattedMessage = message.message;
                        }
                        else {
                            return toString(message);
                        }
                    }
                }
                else {
                    formattedMessage = toString(message.details);
                }
            }
            else if (isNonEmptyString(message.error)) {
                formattedMessage = message.error;
            }
            else if (isNonEmptyString(message.message)) {
                formattedMessage = message.message;
            }
            else if (isObject(message.error) && isNonEmptyString(message.error.message)) {
                formattedMessage = message.error.message;
            }
            else {
                return toString(message);
            }
        }
    }
    if (typeof formattedMessage !== 'string') {
        formattedMessage = toString(formattedMessage);
    }
    formattedMessage = formattedMessage.trim();
    if (isEmptyString(formattedMessage, false) || formattedMessage.length < 2) {
        return formattedMessage;
    }
    var formattedMessage = formattedMessage.charAt(0).toUpperCase() + formattedMessage.slice(1);
    const punctuation = formattedMessage.charAt(formattedMessage.length - 1);
    if (punctuation === '.' || punctuation === '!' || punctuation === '?') {
        return formattedMessage;
    }
    return formattedMessage + '.';
}
exports.formatMessage = formatMessage;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function formatObject(object, format, removeExtra, throwErrors, copyUnsupported, preprocessor, postprocessor) {
    let formattedOptions = removeExtra;
    if (!isObject(removeExtra)) {
        formattedOptions = {
            removeExtra: !!removeExtra,
            throwErrors: !!throwErrors,
            copyUnsupported: !!copyUnsupported,
            preprocessor: preprocessor,
            postprocessor: postprocessor,
        };
    }
    formattedOptions.verbose = parseBoolean(formattedOptions.verbose, true);
    formattedOptions.order = parseBoolean(formattedOptions.order, false);
    if (isFunction(formattedOptions.preprocessor)) {
        if (formattedOptions.throwErrors) {
            object = formattedOptions.preprocessor(object, format, formattedOptions);
        }
        else {
            try {
                object = formattedOptions.preprocessor(object, format, formattedOptions);
            }
            catch (error) {
                if (formattedOptions.verbose) {
                    console.error(error);
                }
                return null;
            }
        }
    }
    if (!isObject(object)) {
        return {};
    }
    if (!isObject(format)) {
        return clone(object, !formattedOptions.copyUnsupported);
    }
    const formatOptions = clone(format, !formattedOptions.copyUnsupported);
    let formatAttribute = null;
    const formatAttributes = Object.keys(formatOptions);
    if (formatAttributes.length === 0) {
        return clone(object, !formattedOptions.copyUnsupported);
    }
    for (var i = 0; i < formatAttributes.length; i++) {
        formatAttribute = formatOptions[formatAttributes[i]];
        let errorMessage = null;
        if (!isObjectStrict(formatAttribute)) {
            errorMessage = 'expected object - received ' + (typeof formatAttribute) + '.';
        }
        else if (isEmptyString(formatAttribute.type)) {
            errorMessage = 'missing or invalid required type option - expected non-empty string.';
        }
        else if (formatAttribute.subtype !== undefined && typeof formatAttribute.subtype !== 'string') {
            errorMessage = 'subtype option must be a string.';
        }
        else if (formatAttribute.type === 'string' && (formatAttribute.trim !== undefined && !isBoolean(formatAttribute.trim))) {
            errorMessage = 'optional string trim option must be a boolean value.';
        }
        else if (formatAttribute.type === 'string' && (formatAttribute.case !== undefined && typeof formatAttribute.case !== 'string')) {
            errorMessage = 'optional string case option must be a string value.';
        }
        else if (formatAttribute.type === 'string' && (formatAttribute.nonEmpty !== undefined && !isBoolean(formatAttribute.nonEmpty))) {
            errorMessage = 'optional string nonEmpty option must be a boolean value.';
        }
        else if (formatAttribute.type === 'object' && (formatAttribute.strict !== undefined && !isBoolean(formatAttribute.strict))) {
            errorMessage = 'optional object strict option must be a boolean value.';
        }
        else if (formatAttribute.type === 'object' && (formatAttribute.nonEmpty !== undefined && !isBoolean(formatAttribute.nonEmpty))) {
            errorMessage = 'optional object nonEmpty option must be a boolean value.';
        }
        else if (formatAttribute.type === 'object' && (formatAttribute.format !== undefined && !isObjectStrict(formatAttribute.format))) {
            errorMessage = 'optional object format option must be an object value.';
        }
        else if (formatAttribute.type === 'array' && (formatAttribute.nonEmpty !== undefined && !isBoolean(formatAttribute.nonEmpty))) {
            errorMessage = 'optional array nonEmpty option must be a boolean value.';
        }
        else if (formatAttribute.type === 'array' && (formatAttribute.format !== undefined && !isObjectStrict(formatAttribute.format))) {
            errorMessage = 'optional array format option must be an object value.';
        }
        else if (formatAttribute.required !== undefined && !isBoolean(formatAttribute.required)) {
            errorMessage = 'optional required format option must be a boolean value.';
        }
        else if (formatAttribute.nullable !== undefined && !isBoolean(formatAttribute.nullable)) {
            errorMessage = 'optional nullable format option must be a boolean value.';
        }
        else if (formatAttribute.validator !== undefined && !isFunction(formatAttribute.validator)) {
            errorMessage = 'optional validator format option must be a function.';
        }
        else if (formatAttribute.parser !== undefined && !isFunction(formatAttribute.parser)) {
            errorMessage = 'optional parser format option must be a function.';
        }
        else if (formatAttribute.formatter !== undefined && !isFunction(formatAttribute.formatter)) {
            errorMessage = 'optional formatter format option must be a function.';
        }
        if (isNonEmptyString(errorMessage)) {
            var message = 'Invalid object format parameters for "' + formatAttributes[i] + '" attribute: ' + errorMessage;
            if (formattedOptions.throwErrors) {
                throw new Error(message);
            }
            if (formattedOptions.verbose) {
                console.error(message);
            }
            return null;
        }
        if (formatAttribute.type === 'number') {
            if (typeof formatAttribute.subtype === 'string') {
                formatAttribute.subtype = formatAttribute.subtype.trim().toLowerCase();
            }
            else {
                formatAttribute.subtype = 'float';
            }
        }
        else if (formatAttribute.type === 'string') {
            if (typeof formatAttribute.case === 'string') {
                formatAttribute.case = formatAttribute.case.trim().toLowerCase();
            }
        }
    }
    let formattedObject = {};
    let attribute = null;
    let value = null;
    let formattedValue = null;
    const attributes = Object.keys(object);
    for (var i = 0; i < attributes.length; i++) {
        attribute = attributes[i];
        value = object[attribute];
        formattedValue = null;
        formatAttribute = formatOptions[attribute];
        if (formatAttribute === undefined) {
            if (!formattedOptions.removeExtra) {
                formattedObject[attribute] = clone(value, !formattedOptions.copyUnsupported);
            }
            continue;
        }
        if (isFunction(formatAttribute.parser)) {
            if (formattedOptions.throwErrors) {
                value = formatAttribute.parser(value, format, formattedOptions);
            }
            else {
                try {
                    value = formatAttribute.parser(value, format, formattedOptions);
                }
                catch (error) {
                    if (formattedOptions.verbose) {
                        console.error(error);
                    }
                    return null;
                }
            }
        }
        if (value === undefined) {
            if (formatAttribute.default !== undefined) {
                formattedObject[attribute] = formatAttribute.default;
            }
            continue;
        }
        else if (value === null) {
            if (formatAttribute.nullable) {
                formattedObject[attribute] = null;
                continue;
            }
            else if (formatAttribute.default !== undefined) {
                formattedObject[attribute] = formatAttribute.default;
                continue;
            }
            else {
                var message = attribute + ' attribute cannot be null!';
                if (formattedOptions.throwErrors) {
                    throw new Error(message);
                }
                if (formattedOptions.verbose) {
                    console.error(message);
                }
                return null;
            }
        }
        else if (formatAttribute.type === 'object') {
            let subObject = null;
            if (typeof value === 'string') {
                try {
                    subObject = JSON.parse(value);
                }
                catch (error) {
                    var message = 'Invalid stringified JSON data for "' + attribute + '" attribute: ' + error.message;
                    if (formattedOptions.throwErrors) {
                        throw new Error(message);
                    }
                    if (formattedOptions.verbose) {
                        console.error(message);
                    }
                    return null;
                }
            }
            else if (isObject(value, formatAttribute.strict)) {
                subObject = clone(value, !formattedOptions.copyUnsupported);
            }
            else {
                var message = 'Type mismatch for "' + attribute + '" attribute, expected ' + formatAttribute.type + ' - received: ' + (typeof subObject) + '.';
                if (formattedOptions.throwErrors) {
                    throw new Error(message);
                }
                if (formattedOptions.verbose) {
                    console.error(message);
                }
                return null;
            }
            if (isObjectStrict(formatAttribute.format)) {
                var subOptions = clone(formattedOptions);
                delete subOptions.preprocessor;
                delete subOptions.postprocessor;
                formattedValue = formatObject(subObject, formatAttribute.format, subOptions);
                if (isInvalid(formattedValue)) {
                    return null;
                }
            }
            else {
                formattedValue = subObject;
            }
        }
        else if (typeof value !== formatAttribute.type) {
            if (typeof value === 'string' && formatAttribute.type === 'number') {
                if (formatAttribute.subtype === 'integer') {
                    formattedValue = parseInteger(value);
                    if (isNaN(formattedValue)) {
                        var message = 'Invalid ' + formatAttribute.subtype + ' ' + formatAttribute.type + ' for ' + attribute + ' attribute: "' + value + '".';
                        if (formattedOptions.throwErrors) {
                            throw new Error(message);
                        }
                        if (formattedOptions.verbose) {
                            console.error(message);
                        }
                        return null;
                    }
                }
                else if (formatAttribute.subtype === 'float') {
                    formattedValue = parseFloatingPointNumber(value);
                    if (isNaN(formattedValue)) {
                        var message = 'Invalid ' + formatAttribute.subtype + ' ' + formatAttribute.type + ' for "' + attribute + '" attribute: "' + value + '".';
                        if (formattedOptions.throwErrors) {
                            throw new Error(message);
                        }
                        if (formattedOptions.verbose) {
                            console.error(message);
                        }
                        return null;
                    }
                }
                else {
                    var message = 'Missing or invalid subtype in format options for "' + attribute + '" number attribute: ' + formatAttribute.subtype + ' - expected integer or float.';
                    if (formattedOptions.throwErrors) {
                        throw new Error(message);
                    }
                    if (formattedOptions.verbose) {
                        console.error(message);
                    }
                    return null;
                }
            }
            else if (formatAttribute.type === 'boolean') {
                formattedValue = parseBoolean(value);
                if (formattedValue === null) {
                    var message = 'Invalid boolean value for "' + attribute + '" attribute: "' + value + '"';
                    if (formattedOptions.throwErrors) {
                        throw new Error(message);
                    }
                    if (formattedOptions.verbose) {
                        console.error(message);
                    }
                    return null;
                }
            }
            else if (formatAttribute.type === 'date') {
                formattedValue = parseDate(value);
            }
            else if (formatAttribute.type === 'array') {
                let array = null;
                if (typeof value === 'string') {
                    try {
                        array = JSON.parse(value);
                    }
                    catch (error) {
                        var message = 'Invalid stringified JSON array for "' + attribute + '" attribute: ' + error.message;
                        if (formattedOptions.throwErrors) {
                            throw new Error(message);
                        }
                        if (formattedOptions.verbose) {
                            console.error(message);
                        }
                        return null;
                    }
                }
                else {
                    array = value;
                }
                if (Array.isArray(array)) {
                    formattedValue = [];
                    var subOptions = clone(formattedOptions);
                    delete subOptions.preprocessor;
                    delete subOptions.postprocessor;
                    if (isObjectStrict(formatAttribute.format)) {
                        for (var j = 0; j < array.length; j++) {
                            if (array[j] === undefined) {
                                continue;
                            }
                            const temp = formatObject({ arrayElement: array[j] }, { arrayElement: formatAttribute.format }, subOptions);
                            if (isInvalid(temp)) {
                                return null;
                            }
                            formattedValue.push(temp.arrayElement);
                        }
                    }
                    else {
                        for (var j = 0; j < array.length; j++) {
                            if (array[j] === undefined) {
                                continue;
                            }
                            formattedValue.push(clone(array[j], !formattedOptions.copyUnsupported));
                        }
                    }
                }
                else {
                    var message = 'Type mismatch for "' + attribute + '" attribute, expected ' + formatAttribute.type + ' - received: ' + (typeof array) + '.';
                    if (formattedOptions.throwErrors) {
                        throw new Error(message);
                    }
                    if (formattedOptions.verbose) {
                        console.error(message);
                    }
                    return null;
                }
            }
            else if (formatAttribute.type === 'string') {
                formattedValue = value.toString();
            }
            else {
                var message = 'Type mismatch for "' + attribute + '" attribute, expected ' + (isNonEmptyString(formatAttribute.subtype) ? formatAttribute.subtype + ' ' : '') + formatAttribute.type + ' - received: ' + (typeof value) + '.';
                if (formattedOptions.throwErrors) {
                    throw new Error(message);
                }
                if (formattedOptions.verbose) {
                    console.error(message);
                }
                return null;
            }
        }
        else {
            if (formatAttribute.type === 'number') {
                if (formatAttribute.subtype === 'integer') {
                    formattedValue = parseInteger(value);
                }
                else {
                    formattedValue = parseFloatingPointNumber(value);
                }
                if (isNaN(formattedValue)) {
                    var message = 'Invalid number specified for "' + attribute + '", expected integer.';
                    if (formattedOptions.throwErrors) {
                        throw new Error(message);
                    }
                    if (formattedOptions.verbose) {
                        console.error(message);
                    }
                    return null;
                }
            }
            else {
                formattedValue = clone(value, !formattedOptions.copyUnsupported);
            }
        }
        if (formatAttribute.type === 'string' && typeof formattedValue === 'string') {
            if (formatAttribute.trim) {
                formattedValue = formattedValue.trim();
            }
            if (formatAttribute.case !== undefined) {
                if (formatAttribute.case === 'lower') {
                    formattedValue = formattedValue.toLowerCase();
                }
                else if (formatAttribute.case === 'upper') {
                    formattedValue = formattedValue.toUpperCase();
                }
                else if (formatAttribute.case === 'proper') {
                    formattedValue = toProperCase(formattedValue);
                }
                else if (formatAttribute.case === 'camel') {
                    formattedValue = toCamelCase(formattedValue);
                }
                else {
                    const caseTypes = {};
                    let caseAttributeData = null;
                    let caseAttribute = null;
                    const caseAttributes = Object.keys(change_case_1.default);
                    for (var j = 0; j < caseAttributes.length; j++) {
                        caseAttributeData = caseAttributes[j].match(/^(([A-Z]+)Case)|([A-Z]+First)$/i);
                        if (!caseAttributeData) {
                            continue;
                        }
                        for (let k = caseAttributeData.length - 1; k >= 0; k--) {
                            if (!isEmptyString(caseAttributeData[k])) {
                                caseAttribute = caseAttributeData[k];
                                break;
                            }
                        }
                        if (!caseAttribute || caseAttribute.startsWith('is')) {
                            continue;
                        }
                        caseTypes[caseAttribute.toLowerCase()] = caseAttribute;
                    }
                    const changeCaseFunction = change_case_1.default[caseTypes[formatAttribute.case]];
                    if (isFunction(changeCaseFunction)) {
                        formattedValue = changeCaseFunction(formattedValue);
                    }
                    else {
                        var message = 'Missing or invalid case value in format options for "' + attribute + '" string attribute: ' + formatAttribute.case + ' - expected lower or upper.';
                        if (formattedOptions.throwErrors) {
                            throw new Error(message);
                        }
                        return null;
                    }
                }
            }
        }
        if (isFunction(formatAttribute.validator)) {
            if (formattedOptions.throwErrors) {
                if (!formatAttribute.validator(formattedValue, format, formattedOptions)) {
                    var message = 'Validation check failed for "' + attribute + '" attribute!';
                    if (formattedOptions.throwErrors) {
                        throw new Error(message);
                    }
                    if (formattedOptions.verbose) {
                        console.error(message);
                    }
                    return null;
                }
            }
            else {
                try {
                    if (!formatAttribute.validator(formattedValue, format, formattedOptions)) {
                        var message = 'Validation check failed for "' + attribute + '" attribute!';
                        if (formattedOptions.throwErrors) {
                            throw new Error(message);
                        }
                        if (formattedOptions.verbose) {
                            console.error(message);
                        }
                        return null;
                    }
                }
                catch (error) {
                    if (formattedOptions.verbose) {
                        console.error(error);
                    }
                    return null;
                }
            }
        }
        if (formatAttribute.nonEmpty === true) {
            if ((formatAttribute.type === 'string' || formatAttribute.type === 'array') && isValid(formattedValue) && formattedValue.length === 0) {
                var message = '"' + attribute + '" attribute cannot be empty!';
                if (formattedOptions.throwErrors) {
                    throw new Error(message);
                }
                if (formattedOptions.verbose) {
                    console.error(message);
                }
                return null;
            }
            else if (formatAttribute.type === 'object' && isValid(formattedValue) && !isNonEmptyObject(formattedValue)) {
                var message = '"' + attribute + '" object attribute cannot be empty!';
                if (formattedOptions.throwErrors) {
                    throw new Error(message);
                }
                if (formattedOptions.verbose) {
                    console.error(message);
                }
                return null;
            }
        }
        if (isFunction(formatAttribute.formatter)) {
            if (formattedOptions.throwErrors) {
                formattedValue = formatAttribute.formatter(formattedValue, format, formattedOptions);
            }
            else {
                try {
                    formattedValue = formatAttribute.formatter(formattedValue, format, formattedOptions);
                }
                catch (error) {
                    if (formattedOptions.verbose) {
                        console.error(error);
                    }
                    return null;
                }
            }
        }
        formattedObject[attribute] = formattedValue;
    }
    for (var i = 0; i < formatAttributes.length; i++) {
        attribute = formatAttributes[i];
        formatAttribute = formatOptions[attribute];
        if (formattedObject[attribute] === undefined) {
            if (formatAttribute.required) {
                var message = 'Missing required "' + attribute + '" attribute!';
                if (formattedOptions.throwErrors) {
                    throw new Error(message);
                }
                if (formattedOptions.verbose) {
                    console.error(message);
                }
                return null;
            }
            if (formatAttribute.default !== undefined) {
                formattedObject[attribute] = clone(formatAttribute.default, !formattedOptions.copyUnsupported);
            }
        }
    }
    if (formattedOptions.order) {
        const orderedObject = {};
        for (var i = 0; i < formatAttributes.length; i++) {
            attribute = formatAttributes[i];
            if (formattedObject[attribute] !== undefined) {
                orderedObject[attribute] = formattedObject[attribute];
                delete formattedObject[attribute];
            }
        }
        const extraAttributes = Object.keys(formattedObject);
        for (var i = 0; i < extraAttributes.length; i++) {
            attribute = extraAttributes[i];
            orderedObject[attribute] = formattedObject[attribute];
        }
        formattedObject = orderedObject;
    }
    if (isFunction(formattedOptions.postprocessor)) {
        if (formattedOptions.throwErrors) {
            formattedObject = formattedOptions.postprocessor(formattedObject, format, formattedOptions);
        }
        else {
            try {
                formattedObject = formattedOptions.postprocessor(formattedObject, format, formattedOptions);
            }
            catch (error) {
                if (formattedOptions.verbose) {
                    console.error(error);
                }
                return null;
            }
        }
    }
    return formattedObject;
}
exports.formatObject = formatObject;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function formatSimpleDate(date, options) {
    const formattedDate = parseDate(date);
    if (formattedDate === undefined) {
        return null;
    }
    let comma = null;
    if (isObject(options)) {
        comma = parseBoolean(options.comma);
    }
    if (comma === null) {
        comma = true;
    }
    return months[formattedDate.getMonth()].name + ' ' + formattedDate.getDate() + (comma ? ',' : '') + ' ' + formattedDate.getFullYear();
}
exports.formatSimpleDate = formatSimpleDate;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function formatStringList(initialData) {
    var _a;
    let list = [];
    if (isNonEmptyString(initialData)) {
        list = (_a = parseStringList(initialData)) !== null && _a !== void 0 ? _a : [];
    }
    else if (isNonEmptyArray(initialData)) {
        list = initialData;
    }
    else if (typeof initialData === 'string' || Array.isArray(initialData)) {
        return '';
    }
    else {
        return null;
    }
    let data = '';
    for (let i = 0; i < list.length; i++) {
        var formattedValue = list[i];
        if (typeof formattedValue === 'string') {
            formattedValue = formattedValue.trim();
            if (formattedValue.length === 0) {
                continue;
            }
        }
        if (data.length > 0) {
            data += ', ';
        }
        data += formattedValue;
    }
    return data;
}
exports.formatStringList = formatStringList;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function futureMonths(date) {
    let month = 0;
    const currentDate = new Date();
    if (date.getFullYear() == currentDate.getFullYear()) {
        month = currentDate.getMonth();
    }
    const months = [];
    for (let i = 0; i < 12; i++) {
        if (i >= month) {
            months.push((i <= 8 ? '0' : '') + (i + 1));
        }
    }
    return months;
}
exports.futureMonths = futureMonths;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function getDateString(date) {
    if (!(date instanceof Date)) {
        date = new Date();
    }
    return date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' : '') + date.getDate() + '_' + (date.getHours() < 10 ? '0' : '') + date.getHours() + '-' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + '-' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
}
exports.getDateString = getDateString;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function indentParagraph(paragraph, amount, indent, clearEmptyLines) {
    if (typeof paragraph !== 'string') {
        return null;
    }
    let formattedClearEmptyLines = parseBoolean(clearEmptyLines);
    if (formattedClearEmptyLines === null) {
        formattedClearEmptyLines = true;
    }
    let formattedAmount = parseInteger(amount);
    if (isNaN(formattedAmount) || formattedAmount < 0) {
        formattedAmount = 1;
    }
    let formattedIndent = indent;
    if (typeof formattedIndent !== 'string') {
        formattedIndent = '\t';
    }
    let indentation = '';
    for (var i = 0; i < formattedAmount; i++) {
        indentation += formattedIndent;
    }
    if (!formattedClearEmptyLines) {
        return paragraph.replace(/^/gm, indentation);
    }
    let line = null;
    const lines = paragraph.split(/\r\n?|\n/g);
    let indentedParagraph = '';
    for (var i = 0; i < lines.length; i++) {
        line = lines[i];
        indentedParagraph += (isEmptyString(line) ? '' : indentation + line) + ((i < lines.length - 1) ? '\n' : '');
    }
    return indentedParagraph;
}
exports.indentParagraph = indentParagraph;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function joinPaths(base, path) {
    const formattedBase = typeof base === 'string' ? base.trim().replace(trailingSlashRegExp, '') : null;
    const formattedPath = typeof path === 'string' ? path.trim().replace(leadingSlashRegExp, '') : null;
    let newPath = '';
    if (isNonEmptyString(formattedBase)) {
        newPath += formattedBase;
        if (isNonEmptyString(formattedPath)) {
            newPath += '/';
        }
    }
    if (isNonEmptyString(formattedPath)) {
        newPath += formattedPath;
    }
    return newPath;
}
exports.joinPaths = joinPaths;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function matchAttribute(element, attribute, value) {
    if (!isObject(element)) {
        return false;
    }
    if (isEmptyString(attribute)) {
        return true;
    }
    return element[attribute] === value;
}
exports.matchAttribute = matchAttribute;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function merge(a, b, copy, deepMerge) {
    if (!isObject(a) || Array.isArray(a)) {
        return null;
    }
    let formattedCopy = parseBoolean(copy);
    if (formattedCopy === null) {
        formattedCopy = true;
    }
    let newObject = null;
    if (formattedCopy) {
        newObject = clone(a);
    }
    else {
        newObject = a;
    }
    if (!isObject(a) || Array.isArray(a) || !isObject(b) || Array.isArray(b)) {
        return newObject;
    }
    let formattedDeepMerge = parseBoolean(deepMerge);
    if (formattedDeepMerge === null) {
        formattedDeepMerge = true;
    }
    let attribute = null;
    let currentValue = null;
    let newValue = null;
    const attributes = Object.keys(b);
    for (let i = 0; i < attributes.length; i++) {
        attribute = attributes[i];
        currentValue = newObject[attribute];
        newValue = clone(b[attribute]);
        if (formattedDeepMerge && isObject(currentValue) && !Array.isArray(currentValue) && isObject(newValue) && !Array.isArray(newValue)) {
            newObject[attribute] = merge(currentValue, newValue);
        }
        else {
            newObject[attribute] = newValue;
        }
    }
    return newObject;
}
exports.merge = merge;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function prependSlash(path) {
    if (typeof path !== 'string') {
        return null;
    }
    let data = path.trim();
    if (data.length === 0) {
        return data;
    }
    if (data[0] !== '/' && data[0] !== '\\') {
        data = '/' + data;
    }
    return data;
}
exports.prependSlash = prependSlash;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function reverseString(data) {
    if (typeof data !== 'string') {
        return null;
    }
    let reverse = '';
    for (let i = 0; i < data.length; i++) {
        reverse += data[data.length - i - 1];
    }
    return reverse;
}
exports.reverseString = reverseString;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function toCamelCase(value, prefix, suffix) {
    var _a;
    const formattedPrefix = typeof prefix === 'string' ? toCamelCase(prefix) : '';
    let formattedSuffix = typeof suffix === 'string' ? toCamelCase(suffix) : '';
    let formattedValue = '';
    let word = null;
    const words = isEmptyString(value) ? [] : (_a = value.trim().replace(/[^\w\s]/g, '').match(/(\w*)/g)) !== null && _a !== void 0 ? _a : [];
    for (let i = 0; i < words.length; i++) {
        word = words[i];
        if (word.length === 0) {
            continue;
        }
        formattedValue += word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    }
    if (formattedValue.length !== 0 && formattedPrefix.length === 0) {
        formattedValue = formattedValue.charAt(0).toLowerCase() + formattedValue.substr(1);
    }
    if ((formattedValue.length !== 0 || formattedPrefix.length !== 0) && formattedSuffix.length !== 0) {
        formattedSuffix = formattedSuffix.charAt(0).toUpperCase() + formattedSuffix.substr(1);
    }
    return formattedPrefix + formattedValue + formattedSuffix;
}
exports.toCamelCase = toCamelCase;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function toTitleCase(value) {
    if (typeof value !== 'string') {
        return null;
    }
    return value.replace(/\w\S*/g, (text) => {
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    });
}
exports.toTitleCase = toTitleCase;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function toString(value) {
    if (value === undefined) {
        return 'undefined';
    }
    else if (value === null) {
        return 'null';
    }
    else if (typeof value === 'string') {
        return value;
    }
    else if (value === Infinity) {
        return 'Infinity';
    }
    else if (value === -Infinity) {
        return '-Infinity';
    }
    else if (typeof value === 'number' && isNaN(value)) {
        return 'NaN';
    }
    else if (isFunction(value)) {
        return value.toString();
    }
    else if (value instanceof Date) {
        return value.toString();
    }
    return JSON.stringify(value);
}
exports.toString = toString;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function trimLeadingZeroes(value) {
    if (typeof value !== 'string') {
        return null;
    }
    if (value.length === 0) {
        return value;
    }
    const formattedValue = value.trim();
    if (formattedValue.length === 0) {
        return formattedValue;
    }
    if (formattedValue.match(/^[0]+$/)) {
        return '0';
    }
    return formattedValue.replace(/^0+/, '');
}
exports.trimLeadingZeroes = trimLeadingZeroes;
/**
 * @deprecated This is a legacy util and should not be used.
 */
function toProperCase(value, prefix, suffix) {
    var formattedPrefix = typeof prefix === 'string' ? toProperCase(prefix) : '';
    var formattedSuffix = typeof suffix === 'string' ? toProperCase(suffix) : '';
    var formattedValue = typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
    if (formattedPrefix.length !== 0) {
        formattedValue = formattedPrefix + (formattedValue.length === 0 ? '' : ' ' + formattedValue);
    }
    if (formattedSuffix.length !== 0) {
        formattedValue = (formattedValue.length === 0 ? '' : formattedValue + ' ') + formattedSuffix;
    }
    var firstWord = true;
    formattedValue = formattedValue.replace(/([^\W_]+[^\s-]*) */g, (word) => {
        var formattedWord = word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        if (!firstWord && !formattedValue.trim().endsWith(word)) {
            for (var i = 0; i < lowerCaseWords.length; i++) {
                if (formattedWord.trim() === lowerCaseWords[i]) {
                    firstWord = false;
                    return formattedWord.toLowerCase();
                }
            }
        }
        for (var i = 0; i < upperCaseWords.length; i++) {
            if (formattedWord.trim() === upperCaseWords[i]) {
                firstWord = false;
                return formattedWord.toUpperCase();
            }
        }
        firstWord = false;
        return formattedWord;
    });
    return formattedValue.trim();
}
exports.toProperCase = toProperCase;
//# sourceMappingURL=legacy.js.map