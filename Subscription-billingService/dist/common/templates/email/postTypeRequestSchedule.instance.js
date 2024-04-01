"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTypeRequestEmail = void 0;
const axios_1 = require("axios");
const postTypeRequestEmail = () => {
    return axios_1.default.create({
        baseURL: process.env.APP_FORM_SERVICE,
        method: "POST",
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
};
exports.postTypeRequestEmail = postTypeRequestEmail;
//# sourceMappingURL=postTypeRequestSchedule.instance.js.map