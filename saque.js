const readlineSync = require('readline-sync');
const fs = require('fs');
function saque(userId){
    const valorSaque = Number(readlineSync.question(`Digite o valor que voce deseja sacar: `))
    const userData = JSON.parse(fs.readFileSync('users.json'));
    usuarioOrigem =  userData.find(usuario => usuario.id == userId)

    if(!usuarioOrigem || usuarioOrigem.saldo < valorSaque){
        console.error("Usuario ou valor invalidos!!")
    }else{
        usuarioOrigem.saldo -= valorSaque;
        console.log(`verifique o caixa eletronico para seu saque no valor de ${valorSaque}\n
            O valor atual da conta e de ${usuarioOrigem.saldo}`)
        fs.writeFileSync('users.json', JSON.stringify(userData));
    }
}
function deposito(userId){
    const valorDeposito = Number(readlineSync.question(`Digite o valor que voce deseja depositar: `))
    const userData = JSON.parse(fs.readFileSync('users.json'));
    usuarioOrigem =  userData.find(usuario => usuario.id == userId)

    if(!usuarioOrigem){
        console.error("Usuario invalido!!")
    }else{
        usuarioOrigem.saldo += valorDeposito;
        console.log(`Voce fez um deposito no valor de ${valorDeposito}\n
            O valor atual da conta e de ${usuarioOrigem.saldo}`)
        fs.writeFileSync('users.json', JSON.stringify(userData));
    }
}

module.exports = {
    saque,
    deposito
  };