const axios = require('axios');
const readlineSync = require('readline-sync');
const { calcularPorquinho } = require('./porquinho'); 
const { solicitarEmprestimo } = require('./emprestimo');
const { solicitarDeposito } = require('./poupanca');
const { tCadastro } = require('./cadastro');
const {} = require('./users.json');
const { transferirLimite } = require('./transferBank');
const { visSaldo } = require('./visualizarSaldo');
const { credito, aumentarLimite } = require('./limite')
const { saque, deposito } = require('./saque.js')
const {gerarExtrato} = require('./extrato.js')
let contadorSaques = 0
let idLogado = ""

function Inicial(){
    bigSpacing();
    let escolha = Number(readlineSync.question(`Bem Vindo ao Banco Softex. \n
        Para continuar e preciso estar logado.\n
        Realize seu login, ou crie um novo cadastro selecionando uma das opcoes abaixo:\n
        1. Login\n
        2. Cadastro \n
        Digite sua opcao: `))
    switch(escolha){
        case 1:
             login()
             break;
        case 2:
            tCadastro();
            login()
            break;
    }
}
Inicial();

async function login (){
    const usuariosResponse  = await axios.get(`http://localhost:3000/users`)
    const usuarios = usuariosResponse.data


    let cpf = String(readlineSync.question(`Por favor informe o seu CPF\n`))
    let senhaId = String(readlineSync.question(`Informe sua senha informada no cadastro\n`))

    const usuarioOrigem = usuarios.find((usuario) => usuario.id === senhaId)    
    try{
        if(usuarioOrigem.cpf === cpf && usuarioOrigem.id === senhaId){
        return idLogado = String(usuarioOrigem.id), categoria()
    }
}catch{
    try {
        throw new Error("CPF ou senha incorretos\n    at login (C:\\Users\\Gabriel\\Documents\\GitHub\\BankSoftex\\index.js:191:11)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)");
    } catch (error) {
        // Captura apenas a primeira linha da mensagem de erro
        let errorMessage = error.message.split('\n')[0];
        console.log(errorMessage);
    }
}
categoria()
}

function categoria() {
    const opcao = Number(readlineSync.question(`Banco Softex \n
    1- Operacoes Financeiras Basicas \n
    2- Produtos e Serviços \n
    3- Autoatendimento \n
    Digite o numero do que desejar: `));

    switch (opcao) {
        case 1:
            exibirOperacoesBasicas();
            break;
            case 2:
            exibirProdutosEServicos();
            break;
        case 3:
            exibirAutoAtendimento();
            break;
            case 4:
                exibirOutrasFuncionalidades();
                break;
        default:
            console.log("Opcao invalida. Tente novamente.");
            break;
        }
}

// Função para exibir opções de operações financeiras básicas
function exibirOperacoesBasicas() {
    bigSpacing();
    console.log("Operacoes Financeiras Basicas: \n" +
                "1- Saque \n" +
                "2- Deposito \n" +
                "3- Visualizacao de Saldo \n" +
                "4- Transferencia Bancaria \n" +
                "5- Extrato");

            const operacoesBasicas = Number(readlineSync.question("Digite o numero do que desejar: "));
            switch (operacoesBasicas) {
                case 1:
                    if(contadorSaques > 2){
                        console.error('Voce atingiu o limite de saques por login, por favor entre novamente.')
                    }else{
                        saque(idLogado); //precisa de uma variavel para o parametro com o id do usuario logado
                        contadorSaques++
                    }
                    break
                    case 2:
                        smallSpacing()
                deposito(idLogado); //precisa de uma variavel para o parametro com o id do usuario logado
                break
                
                case 3:
                smallSpacing();
                visSaldo(idLogado); //precisa de uma variavel para o parametro com o id do usuario logado
                break
                case 4:
                    smallSpacing()
                    transferirLimite(idLogado);
                    break;
                    
                    case 5:
                        smallSpacing()
                gerarExtrato(idLogado);
                break;
                // Outros casos para produtos e serviços...
                default:
                    console.log("Opcao invalida.");
            break;
    }
}

// Função para exibir opções de produtos e serviços
function exibirProdutosEServicos() {
    bigSpacing();
    console.log("Produtos e Servicos: \n" +
        "1- Emprestimo \n" +
                "2- Poupanca \n" +
                "3- Solicitar credito\n" +
                "4- Exclusao do cartao \n" +
                "5- Porquinho \n" +
                "6- Aumentar limite\n");

                const produtosServicos = Number(readlineSync.question("Digite o numero do que desejar: "));
    switch (produtosServicos) {
        case 1:
            smallSpacing()
            solicitarEmprestimo(); 
            break;
            case 2:
            smallSpacing()
            solicitarDeposito();
            break;
            case 3:
                smallSpacing()
            credito(idLogado);
            break;
            case 4:
                smallSpacing()
                exclusao(idLogado); 
                break;
            case 5:
                    smallSpacing()
            calcularPorquinho(); // Chama a função do porquinho
            break;
            case 6:
                smallSpacing()
                aumentarLimite(idLogado)
            break;
            // Outros casos para produtos e serviços...
        default:
            console.log("Opcao invalida.");
            break;
    }
}

// Função para exibir opções de autoatendimento
function exibirAutoAtendimento() {
    bigSpacing();
    //  chama o SAC AQUI OH
}

function bigSpacing() {
    console.log("\n".repeat(8)); 
}

function smallSpacing() {
    console.log("\n\n"); 
}
