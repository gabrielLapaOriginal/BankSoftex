const axios = require('axios');



function visSaldo(userId){
  const apiUrl = 'http://localhost:3000/users';
    axios.get(apiUrl)
    .then(response => {
    const usuarios = response.data;
  
    const usuarioOrigem = usuarios.find((usuario) => usuario.id === userId);
    console.log(`Seu saldo atual e de R$ ${usuarioOrigem.saldo}`)
  })
}
// visSaldo('xG31t2YhD9')
module.exports = {
    visSaldo
}