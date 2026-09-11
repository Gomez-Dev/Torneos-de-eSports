import nodemailer from "nodemailer";

import { env } from "../config/environment.config.js";

const transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT),
  secure: Number(env.MAIL_PORT) === 465,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
});

export const sendConfirmationEmail = async ({
  to,
  reservationCode,
  event,
  quantity,
}) => {
  await transporter.sendMail({
    from: env.MAIL_FROM,
    to,
    subject: `Confirmación de inscripción - ${event.title}`,
    text: `
Tu inscripción fue confirmada.

Evento: ${event.title}
Fecha: ${new Date(event.date).toLocaleString("es-AR")}
Ubicación: ${event.location}
Cantidad de lugares: ${quantity}
Código de reserva: ${reservationCode}

Gracias por registrarte.
    `.trim(),
  });
};
