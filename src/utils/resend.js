import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_KEY);

const enviarMailHabilitado = async (documento, mail) => {
    const email = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [mail],
        subject: "Tu usuario ha sido habilitado",
        html: `<strong>Tu usuario con documento ${documento} ha sido habilitado con éxito.</strong>`,
      });
}

const enviarMailNoHabilitado = async (documento, mail) => {
    const email = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [mail],
        subject: "Tu usuario no ha sido habilitado",
        html: `<strong>Tu usuario con documento ${documento} no ha sido habilitado.</strong>`,
      });
}

export {enviarMailHabilitado, enviarMailNoHabilitado}
