const readlineSync = require('readline-sync');
const { recuperarUsuarios } = require('./cadastro');

function visSaldo(){
    //provavelmenre isso tudo vaiser mudado depois mas talvez não
    users = recuperarUsuarios()
    //requer variável token usada abaixo
    users.forEach(user =>{
        //para cada objeto no array de objetos verifica se cpf == token
        if (Object.keys(user,"cpf") == token){
            console.log(`Olá ${String(Object.keys(user,"nome"))}, seu saldo atual é ${String(Object.keys(user,"saldo"))}`)
        }
    })

    //aqui quebramos o código depois
}

module.exports = {
    visSaldo
}