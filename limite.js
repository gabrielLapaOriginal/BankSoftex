const readlineSync = require('readline-sync');
const axios = require('axios');

const apiUrl = 'http://localhost:3000/users';


function credito() {
  
  // Carregar dados do arquivo JSON
  axios.get(apiUrl)
  .then(response => {
  const usuarios = response.data;

  const cpfOrigem = readlineSync.question(`Confirme o seu cpf: `)
  const usuarioOrigem = usuarios.find((usuario) => usuario.cpf === cpfOrigem);

  // verificar cartao

  if (!usuarioOrigem || usuarioOrigem.tipoCartao == "credito") {
    console.error('Seu usuario nao existe ou ja possui cartao de credito');
  } else {
    const updatedUser = {tipoCartao: "credito", limite: 100}
  axios.patch(`${apiUrl}/${usuarioOrigem.id}`, updatedUser)
  .then(response => {
    console.log(`O seu cartao de credito foi aprovado, seu limite inicial foi estabelecido em R$ ${updatedUser.limite}`);
  })
  .catch(error => {
    console.error('Erro ao atualizar o usuário:', error);
  });

  }
})
}

function aumentarLimite() {
  // Carregar dados do arquivo JSON
  axios.get(apiUrl)
  .then(response => {
  const usuarios = response.data;
  const cpfOrigem = readlineSync.question(`Digite o seu cpf: `)
  usuarioOrigem = usuarios.find((usuario) => usuario.cpf === cpfOrigem);

  // verificar cartao
  if (!usuarioOrigem || usuarioOrigem.tipoCartao == "debito") {
    console.error('Seu usuario nao existe ou nao possui cartao de credito');
  } else {
    const updatedUser = { limite: usuarioOrigem.saldo }
    axios.patch(`${apiUrl}/${usuarioOrigem.id}`, updatedUser)
    .then(response => {console.log(`O seu limite foi aumentado para R$ ${updatedUser.limite}`);
    })
    .catch(error => {
      console.error('Erro ao atualizar o usuário:', error);
    });

  }
})
}
credito()
module.exports = {
  credito,
  aumentarLimite
};

