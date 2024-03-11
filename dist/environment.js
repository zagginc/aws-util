"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsProduction = exports.CurrentEnvironment = exports.EnvironmentType = void 0;
/**
 * Constant values to reference in code allowing for subjective changes to the naming of
 * environments but for code to perform logic checks against fixed values.
 */
var EnvironmentType;
(function (EnvironmentType) {
    /* eslint-disable no-unused-vars */
    EnvironmentType["LOCAL"] = "local";
    EnvironmentType["DEV"] = "dev";
    EnvironmentType["QA"] = "qa";
    EnvironmentType["PROD"] = "prod";
})(EnvironmentType = exports.EnvironmentType || (exports.EnvironmentType = {}));
const CurrentEnvironment = () => { var _a, _b, _c; return (_b = EnvironmentType[(_a = process.env.ENVIRONMENT_OVERRIDE) === null || _a === void 0 ? void 0 : _a.toUpperCase()]) !== null && _b !== void 0 ? _b : EnvironmentType[(_c = process.env.NODE_ENV) === null || _c === void 0 ? void 0 : _c.toUpperCase()]; };
exports.CurrentEnvironment = CurrentEnvironment;
const IsProduction = () => (0, exports.CurrentEnvironment)() === EnvironmentType.PROD;
exports.IsProduction = IsProduction;
//# sourceMappingURL=environment.js.map