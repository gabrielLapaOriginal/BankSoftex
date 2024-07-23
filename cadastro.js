const fs = require('fs');
const path = './users.json';
const readlineSync = require('readline-sync');
// const { default: axios } = require("axios");
const axios = require('axios');
const userIds = {};

//gera id aleatorio
function gerarIdAleatorio() {
    //caracteres que o id podera conter
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let id = '';

    for (let i = 0; i < 10; i++) {
        const randomId = Math.floor(Math.random() * caracteres.length)
        id += caracteres[randomId];
    }
    //Garante que o id nao se repita
    if (userIds.hasOwnProperty(id)){
        return gerarIdAleatorio();
    }else {
        userIds[id] = true;
        console.log(`Sua nova senha e ${id}`)
        return id;
    }
}


//gera numero de cartao de credito aleatorio
function generateCreditCardNumber () {
    let creditCardNumber = ''
    for (let i = 0; i < 16; i++){
        creditCardNumber += Math.floor(Math.random() * 10)
    }
    return creditCardNumber
}

//classe de usuarios
class Users {
    
    constructor(nome, cpf){
        this.id = gerarIdAleatorio();
        this.nome = nome;
        this.cartao = generateCreditCardNumber();
        this.tipoCartao = "debito";
        this.cpf = cpf;
        this.limite = 100;
        this.saldo = 0;
        this.historicoDeTransacao = []
    }
}
//cadastra usuario novo
function cadastroUsuario (nome, cpf) {
    const newUser = new Users(nome, cpf);
    console.log(newUser)
    const apiUrl = 'http://localhost:3000/users';

// Enviar o objeto novoUsuario para a API usando Axios
axios.post(apiUrl, newUser)
  .then(response => {
    console.log('Novo usuário adicionado com sucesso:', response)

    // Atualizar o arquivo JSON local após a adição do usuário
    atualizarArquivoJson();
  })
  .catch(error => {
    console.error('Erro ao adicionar novo usuário:', error);
  });

// Função para atualizar o arquivo JSON local
function atualizarArquivoJson() {
  // Recuperar os usuários do JSON Server
  axios.get(apiUrl)
    .then(response => {
      const usuarios = response.data;

      // Preparar o objeto para escrita no arquivo
      const dataToWrite = {
        users: usuarios // Incluir os usuários dentro do objeto 'users'
      };

      // Escrever de volta no arquivo JSON local
      fs.writeFile('users.json', JSON.stringify(dataToWrite, null, 2), (err) => {
        if (err) {
          console.error('Erro ao escrever no arquivo JSON:', err);
          return;
        }
        console.log('Arquivo JSON atualizado com sucesso.');
      });
    })
    .catch(error => {
      console.error('Erro ao obter usuários do JSON Server:', error);
    });
}
}



//verificando se usuario existe
function cpfUsuarioExiste(cpf){
    axios
    .get(`http://localhost:3000/users`) 
    .then(response =>{
        const usuarios = response.data
        let cpfExiste = usuarios.some(usuario => usuario.cpf  === cpf);
        if(cpfExiste) {
            console.log(cpfExiste)
        } else {
            return
        }
    })
}

//terminal de cadastro
function tCadastro(){
    const nome = String(readlineSync.question(`Área de cadastro de novos clientes
        \nVamos começar a nos conhecer, por favor digite seu nome:\n`))

    const cpf = String(readlineSync.question(`Informe o seu cpf:\n`))
//TODO: Importar e usar aqui a função de verificar cpf do login
const sanitizedCPF = cpf.replace(/\D/g, '');
if (sanitizedCPF.length !== 11) {
    console.log('CPF inválido. Digite apenas os 11 números.');
    process.exit(1);
}
    if (cpfUsuarioExiste(cpf)){
        console.log(`\nLamentamos, já existe um usuário cadastrado com o seguinte CPF: ${cpf}\nOperação Finalizada`);
        //retorna para o menu inicial
        // Inicial();
        console.log('era pra retornar ao menu inicial')
        return
    }else{
        cadastroUsuario(nome, cpf);
        console.log(`\nÓtimo, seja bem vindo ${nome}.
            \nVoce recebeu seu cartao de debito caso queira o servico de credito
            \nBasta requisitar por meio do menu de gerenciamento`)

    }
}
tCadastro();

module.exports ={
     tCadastro
};


// const readline = require('readline-sync');

//Validar CPF
function validarCPF(cpf) {
    // Tira os caracteres q n forem números
    const sanitizedCPF = cpf.replace(/\D/g, '');

    if (sanitizedCPF.length !== 11) {
        console.log('CPF inválido. Digite apenas os 11 números.');
        process.exit(1);
    }

    return true;
}

//Validar senha
// function validarSenha(senha) {
//     return /^\d{6}$/.test(senha);
// }

// // Solicitar dados
// const nomeCompleto = readlineSync.question('Digite seu nome completo: ');
// const cpf = readlineSync.question('Digite seu CPF: ');
// const rg = readlineSync.question('Digite seu RG: ');
// const email = readlineSync.question('Digite seu e-mail: ');
// const dataNascimento = readlineSync.question('Digite sua data de nascimento: ');
// const telefone = readlineSync.question('Digite seu telefone com DDD: ');
// const usuario = readlineSync.question('Digite um nome de usuário: ');
// const senha = readlineSync.question('Digite uma senha: ');


// if (!validarCPF(cpf)) {
//     process.exit(1);
// }

// if(usuarioExiste(cpf)){
//     console.log(`Já existe um usuário cadastrado com o CPF ${cpf}`)
//     process.exit(1);
// }

// if (!validarSenha(senha)) {
//     console.log('Senha inválida. Digite exatamente 6 dígitos.');
//     process.exit(1);
// }

// // Mostrar os dados
// console.log('\nDados cadastrados:');
// console.log(`Nome completo: ${nomeCompleto}`);
// console.log(`CPF: ${cpf}`);
// console.log(`RG: ${rg}`);
// console.log(`E-mail: ${email}`);
// console.log(`Data de nascimento: ${dataNascimento}`);
// console.log(`Telefone: ${telefone}`);
// console.log(`Nome de usuário: ${usuario}`);
// console.log(`Senha: ${senha}`);