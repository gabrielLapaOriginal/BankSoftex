const readlineSync = require('readline-sync');
const fs = require('fs');
const axios = require('axios');


function transferirLimite() {
    const apiUrl = 'http://localhost:3000/users';
    // Carregar dados do arquivo JSON
    axios.get(apiUrl)
    .then(response => {
    const usuarios = response.data;
    
    // Receber os valores
    const cpfOrigem = readlineSync.question(`Digite o seu cpf: `)
    const cpfDestino = readlineSync.question(`Digite o cpf pra qual ira enviar o dinheiro: `)
    const valor = Number(readlineSync.question("Digite o valor da transferencia: "))
    
    // Procurar os usuários no json
    usuarioOrigem = usuarios.find((usuario) => usuario.cpf === cpfOrigem);
    usuarioDestino = usuarios.find((usuario) => usuario.cpf === cpfDestino);
  
    // Validar se os usuários existem e se o valor é válido
    if (!usuarioOrigem || !usuarioDestino || valor <= 0 || valor > usuarioOrigem.saldo) {
      console.error('Transferência inválida!');
    }
  
    // Atualizar saldos dos usuários
    usuarioOrigem.saldo -= valor;
    usuarioDestino.saldo += valor;
    
    // Preparar o objeto para escrita no arquivo
    const dataToWrite = {
        users: usuarios // Incluir os usuários dentro do objeto 'users'
      };
   
fs.writeFileSync('users.json', JSON.stringify(dataToWrite));
  
console.log(`Transferência de R$ ${valor} realizada com sucesso!`);
})
    
  
    // Salvar alterações no arquivo JSON
    
  }
  transferirLimite()

  module.exports = {
    transferirLimite
};