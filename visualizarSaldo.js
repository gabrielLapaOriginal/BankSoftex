const axios = require('axios');
const apiUrl = 'http://localhost:3000/users';


function visSaldo(userId){

    axios.get(apiUrl)
    .then(response => {
    const usuarios = response.data;
  
    const usuarioOrigem = usuarios.find((usuario) => usuario.id === userId);
    console.log(`Seu saldo atual e de R$ ${usuarioOrigem.saldo}`)
   
  })

    // const userData = JSON.parse(fs.readFileSync('users.json'));
    // usuarioOrigem =  userData.find(usuario => usuario.id == userId)
    // console.log(`Seu saldo atual e de ${usuarioOrigem.saldo}`)

    //aqui quebramos o código depois
}
visSaldo('xG31t2YhD9')
module.exports = {
    visSaldo
}