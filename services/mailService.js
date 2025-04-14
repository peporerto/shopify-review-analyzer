import nodemailer from 'nodemailer';

// Configuración del servicio de correo
const transporter = nodemailer.createTransport({
  service: 'gmail', // Cambiar si usas otro servicio
  auth: {
    user: process.env.EMAIL, // Tu correo de Gmail
    pass: process.env.EMAIL_PASSWORD // Contraseña de la app (no la contraseña de Gmail)
  }
});

// Función para enviar el resumen de reseñas por correo
export const sendReviewSummaryEmail = async (userEmail, productId, summary) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `Resumen de reseñas para el producto ${productId}`,
    text: `Aquí está el resumen de las reseñas para el producto ${productId}:\n\n${summary}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};
