/**
 * Constant values to reference in code allowing for subjective changes to the naming of
 * environments but for code to perform logic checks against fixed values.
 */
export declare enum EnvironmentType {
    LOCAL = "local",
    DEV = "dev",
    QA = "qa",
    PROD = "prod"
}
export declare const CurrentEnvironment: () => EnvironmentType;
export declare const IsProduction: () => boolean;
//# sourceMappingURL=environment.d.ts.map