const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
    })
);

module.exports.sendVerificationEmail = (user) => {
  const token = jwt.sign({ 
    uid: user.id,
    email: user.email
  }, process.env.SECRET_KEY , { expiresIn: '1h' } );

  const endpoint = `http://localhost:8000/api/users/verify/${token}`;

  const mailBody=`<h1>Hola ${user.name}, </h1><br> aquí esta tu enlace de verificación: <br>${endpoint}`

  if(process.env.SENDGRID_API_KEY!="") {
    transport.sendMail({
      from: 'david.molina@inesdi.com',
      to: `${user.name} <${user.email}>`,
      subject: 'Inesdi :: Arquitectura de Servidores - Email de verificación',
      html: mailBody
  });
  }

  console.log(`Correo enviado a ${user.email} enlace ${endpoint}`);
};

