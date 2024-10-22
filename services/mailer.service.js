module.exports.sendVerificationEmail = (user) => {
  const token = user.id;
  const endpoint = `http://localhost:8000/api/user/validate/${token}`;

  console.log(`Correo enviado a ${user.email} enlace ${endpoint}`);
};
