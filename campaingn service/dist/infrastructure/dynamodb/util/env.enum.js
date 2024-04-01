"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvEnumMap = exports.EnvEnumValue = exports.EnvEnum = void 0;
var EnvEnum;
(function (EnvEnum) {
    EnvEnum[EnvEnum["development_local"] = 0] = "development_local";
    EnvEnum[EnvEnum["development"] = 1] = "development";
    EnvEnum[EnvEnum["production"] = 2] = "production";
})(EnvEnum || (exports.EnvEnum = EnvEnum = {}));
exports.EnvEnumValue = new Map([
    ['development_local', EnvEnum.development_local],
    ['development', EnvEnum.development],
    ['production', EnvEnum.production],
]);
exports.EnvEnumMap = new Map([
    [
        EnvEnum.development_local,
        [
            {
                region: 'us-east-1',
                endpoint: 'http://localhost:8000',
            },
        ],
    ],
    [
        EnvEnum.development,
        [
            {
                region: 'us-east-1',
            },
        ],
    ],
]);
//# sourceMappingURL=env.enum.js.map