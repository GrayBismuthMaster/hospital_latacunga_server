import nodemailer from 'nodemailer';
export const sendEmail = async (req, res) =>{
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            auth: {
              user: "vyecom@outlook.com", //El email del servicio SMTP que va a utilizar (en este caso Gmail)
              pass: "hqzecgzhkmyejtwp" // La contraseña de dicho SMTP
            },
            tls: {
                rejectUnauthorized: false
              }
          });
            let mailOptions = {
              from: "vyecom@outlook.com", // Quien manda el email
              to: req.body.email, // El email de destino
              replyTo: "vyecom@outlook.com",
              subject: 'Hemos recibido tu correo, en pronto nos comunicaremos contigo :)', // El asunto del email
              text: 'Hola '+req.body.nombre+" en pronto nos comunicaremos", // El mensaje
            //   html: htmlEmail // La parte HTML del email
            };
        
            const respuesta = await transporter.sendMail(mailOptions);
            console.log(respuesta);
            res.status(202).json(respuesta);
    } catch (error) {
        res.status(401).send("Hubo un problema con el correo", error);
    };
}