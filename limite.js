const readlineSync = require('readline-sync');
const fs = require('fs');

// 
// const cpfOrigem = readlineSconst userData = JSON.parse(fs.readFileSync('users.json'));ync.question(`Digite o seu cpf: `)

function credito() {
  const userData = JSON.parse(fs.readFileSync('users.json'));
  const cpfOrigem = readlineSync.question(`Digite o seu cpf: `)
  usuarioOrigem = userData.find((usuario) => usuario.cpf === cpfOrigem);

  // verificar cartao

  if (!usuarioOrigem || usuarioOrigem.tipoCartao == "credito") {
    console.error('Seu usuario nao existe ou ja possui cartao de credito');
  } else {
    usuarioOrigem.tipoCartao = "credito"
    usuarioOrigem.limite = 100

    fs.writeFileSync('users.json', JSON.stringify(userData));

    console.log(`O seu cartao de credito foi aprovado, seu limite inicial foi estabelecido em R$ ${usuarioOrigem.limite}`);
  }
}

function aumentarLimite() {
  // Carregar dados do arquivo JSON
  const userData = JSON.parse(fs.readFileSync('users.json'));
  const cpfOrigem = readlineSync.question(`Digite o seu cpf: `)
  usuarioOrigem = userData.find((usuario) => usuario.cpf === cpfOrigem);

  // verificar cartao

  if (!usuarioOrigem || usuarioOrigem.tipoCartao == "debito") {
    console.error('Seu usuario nao existe ou nao possui cartao de credito');
  } else {
    usuarioOrigem.limite = usuarioOrigem.saldo

    fs.writeFileSync('users.json', JSON.stringify(userData));

    console.log(`O seu limite foi aumentado para R$ ${usuarioOrigem.limite}`);
  }
}

module.exports = {
  credito,
  aumentarLimite
};

// credito();
// aumentarLimite()
