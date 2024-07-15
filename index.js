import {  } from "./emprestimo";
// Testando como fazer a tela de categorias da softex

// Operações Financeiras Básicas:
// Saque
// Depósito
// Transferência Bancária
// Pagamento de Contas
// Recarga de Celular
// Visualização de Saldo
// Tipo de Conta (corrente e salário)
// Histórico de Transações

// Produtos e Serviços:
// Empréstimo
// Poupança
// Cambio
// Cartões (gerenciamento, bloqueio, desbloqueio, cartão virtual)
// Porquinho
// Seguro
// Marketplace
// Plano de Saúde
// Financiamento

// Autoatendimento:
// Agendamento de Transferências
// SAC
// Validação de Usuário

// Outras Funcionalidades:
// Gerenciamento de Limites
// Investimentos
// Alertas e Notificações
// Personalização do App


var readlineSync = require('readline-sync');

function bigEspacamento() {
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
}

function smallEspacamento() {
    console.log("");
    console.log("");
}
function categoria() {
    const opcao = 
    Number(readlineSync.question(`Banco Softex \n
    1- Operacoes Financeiras Basicas : \n
    2- Produtos e Servicos: \n
    3- Autoatendimento: \n 
    4- Outras Funcionalidades: \n
    Digite o numero do que desejar: `))

    switch (opcao) {
        case 1:

        // transformar cada case numa função para facilitar a acao do botao back



            // Operações Financeiras Básicas:
// Saque
// Depósito
// Transferência Bancária
// Pagamento de Contas
// Recarga de Celular
// Visualização de Saldo
// Tipo de Conta (corrente e salário)
// Histórico de Transações
            bigEspacamento()
            console.log("Banco Softex");
            smallEspacamento()
            const financeiroBasico = 
    Number(readlineSync.question(`Operacoes Financeiras Basicas: \n
    1- Saque: \n
    2- Deposito: \n
    3- Pagamento de Contas: \n 
    4- Visualizacao de Saldo: \n
    5- Tipo de Conta (corrente e salario): \n
    6- Historico de Transacoes \n
    Digite o numero do que desejar: `))
            break;
        case 2:
            // Produtos e Serviços:
// Empréstimo
// Poupança
// Cambio
// Cartões (gerenciamento, bloqueio, desbloqueio, cartão virtual)
// Porquinho
// Seguro
// Marketplace
// Plano de Saúde
// Financiamento
            bigEspacamento()
            console.log("Banco Softex \n");
            // smallEspacamento()
            const produtosServicos = 
    Number(readlineSync.question(`Produtos e Servicos \n
    1- Emprestimo: \n
    2- Poupanca: \n
    3- Cambio: \n 
    4- Cartoes (gerenciamento, bloqueio, desbloqueio, cartao virtual): \n
    5- Porquinho: \n
    6- Plano de Saude: \n
    7- Financiamento: \n
    Digite o numero do que desejar: `))

    switch (produtosServicos) {
        case 1:
            bigEspacamento()
            console.log(`1- Emprestimo: \n`);
            break;
    
        case 2:
            bigEspacamento()
            console.log(`2- Poupanca: \n`);
            break;
    
        case 3:
            bigEspacamento()
            console.log(`3- Cambio: \n`);
            break;
    
        case 4:
            bigEspacamento()
            console.log(`4- Cartoes (gerenciamento, bloqueio, desbloqueio, cartao virtual): \n`);
            break;
    
        case 5:
            bigEspacamento()
            console.log(`5- Porquinho: \n`);
            break;
    
        case 6:
            bigEspacamento()
            console.log(`6- Plano de Saude: \n`);
            break;
    
        case 7:
            bigEspacamento()
            console.log(`7- Financiamento: \n`);
            break;
    
        default:
            break;
    }


            break;
        case 3:

        // Autoatendimento:
// Agendamento de Transferências
// SAC
// Validação de Usuário
            bigEspacamento()
            console.log("Banco Softex \n");
            // smallEspacamento()
            const autoAtendimento = 
    Number(readlineSync.question(`Autoatendimento \n
    1- Agendamento de Transferencias: \n
    2- SAC: \n
    3- Validação de Usuario: \n 
    Digite o numero do que desejar: `))
            
            break;
    
        default:
            // Outras Funcionalidades:
// Gerenciamento de Limites
// Investimentos
// Alertas e Notificações
// Personalização do App

            bigEspacamento()
            console.log("Banco Softex \n");
            // smallEspacamento()
            const outrasFuncionalidade = 
    Number(readlineSync.question(`Outras Funcionalidades \n
    1- Gerenciamento de Limites: \n
    2- Investimentos: \n
    3- Alertas e Notificacoes: \n
    4- Personalizacao do App: \n
    Digite o numero do que desejar: `))
            break;
    }
}

categoria()




