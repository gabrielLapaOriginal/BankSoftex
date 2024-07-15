const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askCPF() {
    rl.question('Digite seu CPF (11 dígitos): ', (input) => {
        // Remove caracteres não numéricos e limita a 11 dígitos
        let sanitizedInput = input.replace(/\D/g, '');

        if (sanitizedInput.length === 11) {
            console.log('CPF válido:', formatCPF(sanitizedInput));
            rl.close();
        } else {
            console.log('O CPF deve conter exatamente 11 dígitos.');
            askCPF();  // Pergunta novamente
        }
    });
}

function formatCPF(cpf) {
    // Formata o CPF no formato XXX.XXX.XXX-XX
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

askCPF();