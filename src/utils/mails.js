import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.CONTRASENA_MAIL,
  },
});


  


const enviarMailHabilitado = async (documento, mail) => {
  const mailOptions = {
    from: process.env.MAIL,
    to: mail,
    subject: "Tu usuario ha sido validado correctamente.",
    text: `Tu usuario con documento ${documento} ha sido validado correctamente. Ingrese a la aplicacion para generar su contraseña.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};



const enviarMailNoHabilitado = async (documento, mail) => {
  const mailOptions = {
    from: process.env.MAIL,
    to: mail,
    subject: "Tu usuario no ha sido validado.",
    text: `Tu usuario con documento ${documento} no ha sido validado correctamente. Consulte con el soporte tecnico.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

const enviarMailRecuperarClave = async (documento, mail, password) => {
  const mailOptions = {
    from: process.env.MAIL,
    to: mail,
    subject: "Tu usuario ha sido cambiada.",
    text: `A tu usuario con documento ${documento} se le ha generado la siguiente clave: ${password}.`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
}




export {enviarMailHabilitado, enviarMailNoHabilitado, enviarMailRecuperarClave}
