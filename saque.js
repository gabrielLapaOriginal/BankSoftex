const readlineSync = require('readline-sync');
const axios = require('axios');
const fs = require('fs');

const apiUrl = 'http://localhost:3000/users';
const transHistory = 'http://localhost:3000/transactions'


function saque(userId){
    const tipoTransacao = 'saque' //fazendo agr

    const valorSaque = Number(readlineSync.question(`Digite o valor que voce deseja sacar: `))
    axios.get(apiUrl)
    .then(response => {
    const usuarios = response.data;


    usuarioOrigem =  usuarios.find(usuario => usuario.id == userId)

    if(!usuarioOrigem || usuarioOrigem.saldo < valorSaque){
        console.error("Usuario ou valor invalidos!!")
    }else{
        // usuarioOrigem.saldo -= valorSaque;
        const updatedUser = {saldo: usuarioOrigem.saldo -= valorSaque}
        axios.patch(`${apiUrl}/${usuarioOrigem.id}`, updatedUser)
        .then(() => {
            console.log(`verifique o caixa eletronico para seu saque no valor de R$ ${valorSaque} \nValor atual da conta e de R$ ${usuarioOrigem.saldo}`)
            
            attTransactions(userId, tipoTransacao, valorSaque) //fazendo agr
        })
  .catch(error => {
    console.error('Erro ao atualizar o usuário:', error);
  });

    }
})
}

function deposito(userId){
    const tipoTransacao = 'deposito' //fazendo agr

    const valorDeposito = Number(readlineSync.question(`Digite o valor que voce deseja depositar: `))
    axios.get(apiUrl)
    .then(response => {
    const usuarios = response.data;
    usuarioOrigem =  usuarios.find(usuario => usuario.id == userId)

    if(!usuarioOrigem){
        console.error("Usuario invalido!!")
    }else{
        const updatedUser = {saldo: usuarioOrigem.saldo += valorDeposito}
        axios.patch(`${apiUrl}/${usuarioOrigem.id}`, updatedUser)
        .then(() => {
            console.log(`Voce fez um deposito no valor de ${valorDeposito}\nO valor atual da conta e de ${usuarioOrigem.saldo}`)
            //chama a funcao para atualizar as transacoes
            attTransactions(userId, tipoTransacao, valorDeposito)//fazendo agr
        })
    }
})
}
// funcao para atualizar a tabela transactions
const attTransactions = async (id, tipoTransacao, valor) =>{
     const transacoesResponse = await axios.get(transHistory)
     transacoes = transacoesResponse.data

    const transacaoUsuario = transacoes.find(trans => trans.id === id)
    if(transacaoUsuario && tipoTransacao === 'saque'){
        transacaoUsuario.transacao.push('saque')
        transacaoUsuario.valor.push(-valor)
        
        axios.patch(`${transHistory}/${id}`, transacaoUsuario)
    }else{
        transacaoUsuario.transacao.push('deposito')
        transacaoUsuario.valor.push(valor)
        
        axios.patch(`${transHistory}/${id}`, transacaoUsuario)
    }
}
deposito('xG31t2YhD9')

module.exports = {
    saque,
    deposito
  };