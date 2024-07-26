const axios = require('axios');
const apiUrl = 'http://localhost:3000/users';


function visSaldo(userId){

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