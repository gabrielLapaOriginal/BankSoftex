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
    }
}
//cadastra usuario novo
function cadastroUsuario (nome, cpf) {
    const newUser = new Users(nome, cpf);
    const apiUrl = 'http://localhost:3000/users';
    const transHistory = 'http://localhost:3000/transactions'

// Enviar o objeto novoUsuario para a API usando Axios
axios.post(apiUrl, newUser)
  .then(() => {
    console.log('Novo usuário adicionado com sucesso:')
  })
  .catch(error => {
    console.error('Erro ao adicionar novo usuário:', error);
  });
  const newUserHistory = {id: newUser.id, transacao: [], valor: []}

  axios.post(transHistory, newUserHistory)
  .catch(error => {
    console.error('Erro ao adicionar novo usuário:', error);
  });

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
    cpf = String(readlineSync.question(`Informe o seu cpf:\n`))
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
            \nVoce recebeu seu cartao de debito caso queira o servico de credito\nBasta requisitar por meio do menu de gerenciamento`)

    }
}
tCadastro();

module.exports ={
     tCadastro
};
