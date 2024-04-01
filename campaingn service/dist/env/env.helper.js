"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnvPath = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const process = require("process");
function loadEnvPath(dest) {
    const env = process.env.NODE_ENV;
    const fallBack = (0, path_1.resolve)(`${env}.env`);
    const fileName = env ? `${env}.env` : 'development.local.env';
    let filePath = (0, path_1.resolve)(`${dest}/${fileName}`);
    if (!(0, fs_1.existsSync)(filePath))
        filePath = fallBack;
    return filePath;
}
exports.loadEnvPath = loadEnvPath;
//# sourceMappingURL=env.helper.js.map