const nodemailer = require ("nodemailer")

const createTrasporte = () => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "381b84cadc3dc0",
          pass: "5c2bc514ab0e04"
        }
    });
    return transport
}

const sendEmail = async (user) => {
    const transporter = createTrasporte()
    const info = await transporter.sendMail({
        from: '"Mail de Prueba"<mailprueba@gmail.com>',
        to: `${user.email}`,
        subject: `Gracias por registrarte ${user.name}`,
        html:" HOLaaaaaaaaaaaaaaaaaaa"
    })

    console.log("Mensaje enviado", info.messageId)
    return 
}

exports.sendEmail = (user) => sendEmail(user)