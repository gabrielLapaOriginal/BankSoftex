const fs = require('fs');
const path = './users.json';

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
    
    constructor(nome, cpf){
        this.id = GerarIdAleatorio();
        this.nome = nome;
        this.cartao = generateCreditCardNumber();
        this.tipoCartao = "debito";
        this.cpf = cpf;
        this.limite = 100;
        this.saldo = 0;
        this.historicoDeDeposito = []
    }
}
//cadastra usuario novo
function cadastroUsuario (nome, cpf) {
    const newUser = new Users(nome, cpf);
   
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
// //recuperarUsuarios();


// //verificando se usuario existe
// function usuarioExiste(cpf){
//     let users = recuperarUsuarios();
//     users.forEach(user =>{
//         //para cada objeto no array de objetos verifica se cpf já existe
//         if (Object.keys(user,"cpf") == cpf){
//             return true;
//         }
//     })
//     return false;
// }

// //terminal de cadastro
// function tCadastro(){
//     const nome = String(readlineSync(`Área de cadastro de novos clientes\n
//         Vamos começar a nos conhecer, por favor digite seu nome:\n`))

//     let cpf = String(readlineSync(`Informe o seu cpf:\n`))

//     console.log(`\nÓtimo, seja bem vindo ${nome}.
//         \nSua nova conta está quase pronta...
//         \nSeu limite inicial será 100R$, a qualquer momento você poderá pedir uma reavaliação do seu limite`)
// //TODO: Importar e usar aqui a função de verificar cpf do loguin
//     if (usuarioExiste(cpf)){
//         console.log(`\nLamentamos, já existe um usuário cadastrado com o seguinte CPF: ${nome}\nOperação Finalizada`);
//         //retorna para o menu inicial
//         Inicial();

//     }else{
//         cadastroUsuario(nome, cpf);
//     }
// }
// tCadastro();

// // module.exports ={
// //     recuperarUsuarios,
////      tCadastro
// // };


const readline = require('readline-sync');

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
function validarSenha(senha) {
    return /^\d{6}$/.test(senha);
}

// Solicitar dados
const nomeCompleto = readline.question('Digite seu nome completo: ');
const cpf = readline.question('Digite seu CPF: ');
const rg = readline.question('Digite seu RG: ');
const email = readline.question('Digite seu e-mail: ');
const dataNascimento = readline.question('Digite sua data de nascimento: ');
const telefone = readline.question('Digite seu telefone com DDD: ');
const usuario = readline.question('Digite um nome de usuário: ');
const senha = readline.question('Digite uma senha: ');


if (!validarCPF(cpf)) {
    process.exit(1);
}

if (!validarSenha(senha)) {
    console.log('Senha inválida. Digite exatamente 6 dígitos.');
    process.exit(1);
}

// Mostrar os dados
console.log('\nDados cadastrados:');
console.log(`Nome completo: ${nomeCompleto}`);
console.log(`CPF: ${cpf}`);
console.log(`RG: ${rg}`);
console.log(`E-mail: ${email}`);
console.log(`Data de nascimento: ${dataNascimento}`);
console.log(`Telefone: ${telefone}`);
console.log(`Nome de usuário: ${usuario}`);
console.log(`Senha: ${senha}`);