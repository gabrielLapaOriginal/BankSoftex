const readlineSync = require('readline-sync');
const fs = require('fs');

function visSaldo(userId){
    const userData = JSON.parse(fs.readFileSync('users.json'));
    usuarioOrigem =  userData.find(usuario => usuario.id == userId)
    console.log(`Seu saldo atual e de ${usuarioOrigem.saldo}`)

    //aqui quebramos o código depois
}
visSaldo('xG31t2YhD9')
module.exports = {
    visSaldo
}