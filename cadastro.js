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
    
    constructor(nome, tipoCartao, limite){
        this.id = GerarIdAleatorio();
        this.nome = nome;
        this.cartao = generateCreditCardNumber();
        this.tipoCartao = tipoCartao;
        this.bloqueado = false;
        this.limite = limite;
    }
}
//cadastra usuario novo
function cadastroUsuario (nome, tipoCartao, limiteInicial) {
    const newUser = new Users(nome, tipoCartao, limiteInicial);

   
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

//recuperando os usuarios
function recuperarUsuarios(){
    fs.readFile(path, 'utf8', (err, data) =>{
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return
        }

        const users = JSON.parse(data);
        console.log(users);
    });
}
recuperarUsuarios();