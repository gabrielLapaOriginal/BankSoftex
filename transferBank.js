const readlineSync = require('readline-sync');
const fs = require('fs');


function transferirLimite() {
    // Carregar dados do arquivo JSON
    const userData = JSON.parse(fs.readFileSync('users.json'));

    // Receber os valores
    const cpfOrigem = readlineSync.question(`Digite o seu cpf: `)
    const cpfDestino = readlineSync.question(`Digite o cpf pra qual ira enviar o dinheiro: `)
    const valor = Number(readlineSync.question("Digite o valor da transferencia: "))
    
    // Procurar os usuários no json
    usuarioOrigem = userData.find((usuario) => usuario.cpf === cpfOrigem);
    usuarioDestino = userData.find((usuario) => usuario.cpf === cpfDestino);
  
    // Validar se os usuários existem e se o valor é válido
    if (!usuarioOrigem || !usuarioDestino || valor <= 0 || valor > usuarioOrigem.saldo) {
      console.error('Transferência inválida!');
    }
  
    // Atualizar saldos dos usuários
    usuarioOrigem.saldo -= valor;
    usuarioDestino.saldo += valor;
  
    // Salvar alterações no arquivo JSON
    fs.writeFileSync('users.json', JSON.stringify(userData));
  
    console.log(`Transferência de R$ ${valor} realizada com sucesso!`);
  }

  module.exports = {
    transferirLimite
};