const fs = require('fs');
const path = './users.json';
const { readlineSync } = require('./index');

const userIds = {};

//gera id aleatorio
function GerarIdAleatorio() {
    //caracteres que o id podera conter
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let id = '';

    for (let i = 0; i < 10; i++) {
        const randomId = Math.floor(Math.random() * caracteres.length)
        id += caracteres[randomId];
    }
    //Garante que o id nao se repita
    if (userIds.hasOwnProperty(id)){
        return generateRandomId();
    }else {
        userIds[id] = true;
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
    
    constructor(nome, tipoCartao, limite, cpf){
        this.id = GerarIdAleatorio();
        this.nome = nome;
        this.cartao = generateCreditCardNumber();
        this.tipoCartao = tipoCartao;
        this.cpf = cpf;
        this.limite = limite;
        this.saldo = saldo;
    }
}
//cadastra usuario novo
function cadastroUsuario (nome, tipoCartao, limiteInicial, cpf, saldo) {
    const newUser = new Users(nome, tipoCartao, limiteInicial, cpf, saldo);
   
    fs.readFile(path, 'utf8', (err, data) => {
        let users = [];

        if (!err) {
            try {
                users = JSON.parse(data);
            } catch (error) {
                console.error('Erro ao parsear JSON:', error);
                return;
            }
        }
            users.push(newUser);
        

        fs.writeFile(path, JSON.stringify(users, null, 2), 
        ((err) => err 
        ? console.error(`Erro ao salvar o arquivo: ${err}`) 
        : console.log('Usuário cadastrado com sucesso!'))
    
    );
    })
}


function recuperarUsuarios(){
    fs.readFile(path, 'utf8', (err, data) =>{
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return
        }
        let users = JSON.parse(data);
        ////debug
        //console.log(users); 
        return users;
    });
}
//recuperarUsuarios();


//verificando se usuario existe
function usuarioExiste(nome){
    let users = recuperarUsuarios();
    users.forEach(user =>{
        //para cada objeto no array de objetos verifica se nome já existe
        if (Object.keys(user,"nome") == nome){
            return true;
        }
    })
    return false;
}

//terminal de cadastro
function tCadastro(){
    const nome = String(readlineSync(`Área de cadastro de novos clientes\n
        Vamos começar a nos conhecer, por favor digite seu nome:\n`))
    let tipoCartao = Number(readlineSync(`Informe o tipo de cartão para sua conta:\n
        1. Crédito\n
        2. Débito\n`))

    switch (tipoCartao){
        case 1:
            tipoCartao = "credito";
            break;
        case 2:
            tipoCartao = "debito";
            break;
    }
    const limite = (Number(readlineSync(`\nÓtimo, seja bem vindo ${nome}.
        \nSua nova conta de ${tipoCartao} está quase pronta...
        \nMas primeiro precisamos saber, qual a sua renda salarial mensal?`))*4)

    if (usuarioExiste(nome)){
        console.log(`\nLamentamos, o usuário ${nome} já possui conta no nosso sistema\nOperação Finalizada`)
        //TO DO: sistema de retornar
    }else{
        cadastroUsuario(nome, tipoCartao, limite)
    }
}
tCadastro()


