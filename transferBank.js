const readlineSync = require('readline-sync');
const fs = require('fs');


function transferirLimite() {
    // Carregar dados do arquivo JSON
    const userData = JSON.parse(fs.readFileSync('users.json'));

    // Receber os valores
    const idOrigem = readlineSync.question(`Digite o seu id: `)
    const idDestino = readlineSync.question(`Digite o id pra qual ira enviar o dinheiro: `)
    const valor = Number(readlineSync.question("Digite o valor da transferencia: "))
    
    // Procurar os usuários no json
    usuarioOrigem = userData.find((usuario) => usuario.id === idOrigem);
    usuarioDestino = userData.find((usuario) => usuario.id === idDestino);
  
    // Validar se os usuários existem e se o valor é válido
    if (!usuarioOrigem || !usuarioDestino || valor <= 0 || valor > usuarioOrigem.limite) {
      console.error('Transferência inválida!');
    }
  
    // Atualizar saldos dos usuários
    usuarioOrigem.limite -= valor;
    usuarioDestino.limite += valor;
  
    // Salvar alterações no arquivo JSON
    fs.writeFileSync('users.json', JSON.stringify(userData));
  
    console.log(`Transferência de R$ ${valor} realizada com sucesso!`);
  }

  module.exports = {
    transferirLimite
};