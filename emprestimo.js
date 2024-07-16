const readlineSync = require('readline-sync');

function calcularValorEmprestimo(depositos) {
    // Média dos depósitos dos últimos 6 meses
    const somaDepositos = depositos.reduce((acc, curr) => acc + curr, 0);
    const mediaDepositos = somaDepositos / depositos.length;

    // Valor do empréstimo (70% da média dos depósitos)
    const valorEmprestimo = mediaDepositos * 0.7;
    return valorEmprestimo;
}

function calcularParcelasEmprestimo(valorEmprestimo, meses) {
    const taxaJurosMensal = 7; // Taxa de juros fixa de 7% ao mês, média dos bancos em 2023.
    const valorTotalComJuros = valorEmprestimo * Math.pow(1 + taxaJurosMensal / 100, meses);
    const valorParcelaMensal = valorTotalComJuros / meses;
    return valorParcelaMensal;
}

function solicitarDepositos() {
    let depositos = [];
    for (let i = 1; i <= 6; i++) {
        const deposito = parseFloat(readlineSync.question(`Digite o valor do depósito no mês ${i}: R$ `));
        depositos.push(deposito);
    }
    return depositos;
}

function solicitarEmprestimo() {
    const depositos = solicitarDepositos();
    const valorEmprestimo = calcularValorEmprestimo(depositos);

    console.log(`\nCom base nos seus depósitos, você pode pegar um empréstimo de até R$ ${valorEmprestimo.toFixed(2)}`);

    const meses = parseInt(readlineSync.question('Em quantos meses você deseja pagar o empréstimo? '));

    const valorParcelaMensal = calcularParcelasEmprestimo(valorEmprestimo, meses);

    console.log(`\nO valor das parcelas mensais será de R$ ${valorParcelaMensal.toFixed(2)} por ${meses} meses.`);
}

solicitarEmprestimo();