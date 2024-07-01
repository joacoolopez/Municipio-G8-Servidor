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
    subject: "Tu clave ha sido modificada.",
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


const enviarMailRecuperarClaveInspector = async (legajo, mail, password) => {
  const mailOptions = {
    from: process.env.MAIL,
    to: mail,
    subject: "Tu clave ha sido modificada.",
    text: `A tu usuario con legajo ${legajo} se le ha generado la siguiente clave: ${password}.`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
}

const enviarMailMovimientoReclamo = async (idReclamo, responsable, causa, mail) => {
  const mailOptions = {
    from: process.env.MAIL,
    to: mail,
    subject: `Tu reclamo #${idReclamo} ha recibido una actualizacion.`,
    text: `${responsable} ha agregado "${causa}" a su reclamo.`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
}

const enviarMailCambioEstadoReclamo = async (idReclamo, nuevoEstado, mail) => {
  const mailOptions = {
    from: process.env.MAIL,
    to: mail,
    subject: `Tu reclamo #${idReclamo} ha cambiado de estado.`,
    text: `El reclamo #${idReclamo} ha cambiado de estado a: ${nuevoEstado}.`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
}

const enviarMailCambioEstadoDenuncia = async (idDenuncia, nuevoEstado, mail) => {
  const mailOptions = {
    from: process.env.MAIL,
    to: mail,
    subject: `Tu denuncia #${idDenuncia} ha cambiado de estado.`,
    text: `La denuncia #${idDenuncia} ha cambiado de estado a: ${nuevoEstado}.`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
}

const enviarMailMovimientoDenuncia = async (idDenuncia, responsable, causa, mail) => {
  const mailOptions = {
    from: process.env.MAIL,
    to: mail,
    subject: `Tu denuncia #${idDenuncia} ha recibido una actualizacion.`,
    text: `${responsable} ha agregado "${causa}" a su denuncia.`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
}

const enviarMailUnificacionReclamo = async (idReclamo, idReclamoUnificador, mail) => {
  const mailOptions = {
    from: process.env.MAIL,
    to: mail,
    subject: `Tu reclamo #${idReclamo} ha sido unificado.`,
    text: `Tu reclamo #${idReclamo} ha sido unificado con el reclamo #${idReclamoUnificador}.`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
}

export {enviarMailHabilitado, enviarMailNoHabilitado, enviarMailRecuperarClave, enviarMailRecuperarClaveInspector,
       enviarMailMovimientoReclamo, enviarMailCambioEstadoReclamo, enviarMailUnificacionReclamo,
        enviarMailCambioEstadoDenuncia, enviarMailMovimientoDenuncia}
