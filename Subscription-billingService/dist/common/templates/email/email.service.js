"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const const_1 = require("../../constants/const");
const postTypeRequestSchedule_instance_1 = require("./postTypeRequestSchedule.instance");
const emailService = async (customerEmail, bodyMessage) => {
    const postRequest = (0, postTypeRequestSchedule_instance_1.postTypeRequestEmail)();
    try {
        const res = await postRequest({
            data: {
                sender: const_1.EMAIL_SENDER,
                message: bodyMessage,
                receivers: [customerEmail],
                subject: "Renovación de subscripción",
            },
        });
        const response = res;
        return response;
    }
    catch (error) {
        console.error("Error al realizar la solicitud:", error);
        throw error;
    }
};
exports.emailService = emailService;
//# sourceMappingURL=email.service.js.map