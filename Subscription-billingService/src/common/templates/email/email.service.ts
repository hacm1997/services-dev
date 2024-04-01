import { EMAIL_SENDER } from "src/common/constants/const";
import { postTypeRequestEmail } from "./postTypeRequestSchedule.instance";

export const emailService = async (
  customerEmail: string,
  bodyMessage: string
) => {
  const postRequest = postTypeRequestEmail();
  // const messageBody = emailTemplate();

  try {
    const res = await postRequest({
      data: {
        sender: EMAIL_SENDER,
        message: bodyMessage,
        receivers: [customerEmail],
        subject: "Renovación de subscripción",
      },
    });
    const response = res;
    return response;
  } catch (error) {
    // Maneja el error aquí si es necesario
    console.error("Error al realizar la solicitud:", error);
    throw error; // Puedes relanzar el error o manejarlo de alguna otra manera
  }
};
