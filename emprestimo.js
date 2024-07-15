const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

;;

    var investimentoAcumulado = investimentoInicial;

    var totalInvestimentoAcumulado = investimentoInicial + (investimentoMensal * meses);

    var jurosCompostos = 0;
    var jurosCompostosTotal = 0;

    for (var i = 0; i < $meses; i++) {
        jurosCompostos = (investimentoAcumulado + taxaDejuros) / 100;
        jurosCompostosTotal += jurosCompostos;
        investimentoAcumulado += jurosCompostos + investimentoMensal;
    }

    var valorAReceber = totalInvestimentoAcumulado + jurosCompostosTotal;
}