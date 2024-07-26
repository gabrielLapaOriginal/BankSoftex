const readlineSync = require('readline-sync');
const axios = require('axios');

const apiUrl = 'http://localhost:3000/users';
const transHistory = 'http://localhost:3000/transactions'
const axiosConfig = {
  timeout: 5000}

function transferirLimite(id) {
    // Carregar dados do arquivo JSON
    axios.get(apiUrl, axiosConfig)
    .then(usersResponse => {
      const usuarios = usersResponse.data; // acessando os dados da resposta de usuários
      
      axios.get(transHistory, axiosConfig)
        .then(transactionsResponse => {
          const transacoes = transactionsResponse.data; // acessando os dados da resposta de transações
          
    
    // Receber os valores
    const idOrigem = readlineSync.question(`Confirme o seu id: `)
    const cpfDestino = readlineSync.question(`Digite o cpf pra qual ira enviar o dinheiro: `)
    const valor = Number(readlineSync.question("Digite o valor da transferencia: "))

    if(id !== idOrigem){
      throw new Error('Id fornecido invalido, passe somente o seu id na confirmacao')
    }
    
    // Procurar os usuários no json
    const usuarioOrigem = usuarios.find((usuario) => usuario.id === idOrigem);
    const usuarioDestino = usuarios.find((usuario) => usuario.cpf === cpfDestino);
    
    const transOrigem = transacoes.find((trans) => trans.id === idOrigem);
    const transDestino = transacoes.find((trans) => trans.id === usuarioDestino.id);
  
    // Validar se os usuários existem e se o valor é válido
    if (!usuarioOrigem || !usuarioDestino || valor <= 0 || valor > usuarioOrigem.saldo) {
      return console.error('Transferência inválida!');
    }
  
    // Atualizar saldos dos usuários
    usuarioOrigem.saldo -= valor;
    usuarioDestino.saldo += valor;

    if (transOrigem) {
      transOrigem.transacao.push('Transferência');
      transOrigem.valor.push(-valor);
    }

    // Adicionar transação para usuário destino
    if (transDestino) {
      transDestino.transacao.push('Valor recebido');
      transDestino.valor.push(valor);
    }

    axios.all([
      axios.put(`${apiUrl}/${usuarioOrigem.id}`, usuarioOrigem, axiosConfig), // ignorar, a primeira requisicao e repetida pois sempre da erro
      axios.put(`${apiUrl}/${usuarioOrigem.id}`, usuarioOrigem, axiosConfig),
      axios.put(`${apiUrl}/${usuarioDestino.id}`, usuarioDestino, axiosConfig),
      axios.put(`${transHistory}/${idOrigem}`, transOrigem, axiosConfig),
      axios.put(`${transHistory}/${transDestino.id}`, transDestino, axiosConfig)
  ])
  .then(axios.spread(() => {
      console.log(`Transferência de R$ ${valor} realizada com sucesso!`);
  }))
  .catch(error => {
      console.error('');
  });

console.log(`Transferência de R$ ${valor} realizada com sucesso!`);
  
  })
})

  }
  transferirLimite('xG31t2YhD9')

  module.exports = {
    transferirLimite
};
