const readlineSync = require('readline-sync');
const { calcularPorquinho } = require('./porquinho'); 
const {} = require('./cadastro');
const {} = require('./users.json');
const { transferirLimite } = require('./transferBank');

function bigSpacing() {
    console.log("\n".repeat(8)); 
}

function smallSpacing() {
    console.log("\n\n"); 
}

// Função para exibir opções de operações financeiras básicas
function exibirOperacoesBasicas() {
    bigSpacing();
    console.log("Operações Financeiras Básicas: \n" +
                "1- Saque \n" +
                "2- Depósito \n" +
                "3- Pagamento de Contas \n" +
                "4- Visualização de Saldo \n" +
                "5- Tipo de Conta (corrente e salário) \n" +
                "6- Transferencia Bancaria \n" +
                "7- Histórico de Transações");

            const produtosServicos = Number(readlineSync.question("Digite o número do que desejar: "));
            switch (produtosServicos) {
                case 6:
                smallSpacing()
                transferirLimite();
                break;
        // Outros casos para produtos e serviços...
            default:
                console.log("Opção inválida.");
            break;
    }
}

// Função para exibir opções de produtos e serviços
function exibirProdutosEServicos() {
    bigSpacing();
    console.log("Produtos e Serviços: \n" +
                "1- Empréstimo \n" +
                "2- Poupança \n" +
                "3- Câmbio \n" +
                "4- Cartões (gerenciamento, bloqueio, desbloqueio, cartão virtual) \n" +
                "5- Porquinho \n" +
                "6- Plano de Saúde \n" +
                "7- Financiamento");

    const produtosServicos = Number(readlineSync.question("Digite o número do que desejar: "));
    switch (produtosServicos) {
        case 5:
            smallSpacing()
            calcularPorquinho(); // Chama a função do porquinho
            break;
        // Outros casos para produtos e serviços...
        default:
            console.log("Opção inválida.");
            break;
    }
}

// Função para exibir opções de autoatendimento
function exibirAutoAtendimento() {
    bigSpacing();
    console.log("Autoatendimento: \n" +
                "1- Agendamento de Transferências \n" +
                "2- SAC \n" +
                "3- Validação de Usuário");
}

// Função para exibir opções de outras funcionalidades
function exibirOutrasFuncionalidades() {
    bigSpacing();
    console.log("Outras Funcionalidades: \n" +
                "1- Gerenciamento de Limites \n" +
                "2- Investimentos \n" +
                "3- Alertas e Notificações \n" +
                "4- Personalização do App");
}

// Função principal para exibir o menu e processar a entrada do usuário
function categoria() {
    const opcao = Number(readlineSync.question(`Banco Softex \n
    1- Operações Financeiras Básicas \n
    2- Produtos e Serviços \n
    3- Autoatendimento \n
    4- Outras Funcionalidades \n
    Digite o número do que desejar: `));

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
            console.log("Opção inválida. Tente novamente.");
            break;
    }
}

categoria();

