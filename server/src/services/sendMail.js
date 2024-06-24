const nodemailer = require("nodemailer");
exports.enviarMail = async (options) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: options.email,
      subject: options.subject,
      text: "Envio de correos",
      attachDataUrls: true,
      html: `
        <h2>${options.message}</h2>
        `,
    };
    const info = await transporter.sendMail(mailOptions);
    return info.response;
  } catch (error) {
    console.log("Error al enviar el correo electrónico:", error);
    return error;
  }
};
