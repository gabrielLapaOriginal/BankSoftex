const axios = require('axios');

// Função para formatar o valor com duas casas decimais
const formatarValor = (valor) => valor.toFixed(2).replace('.', ',');

// Função para gerar o extrato
const gerarExtrato = async (usuarioId) => {
  const apiUrl = 'http://localhost:3000'

  try {
    // Buscar os dados dos usuários e transações
    const [usuariosResponse, transacoesResponse] = await Promise.all([
      axios.get(`${apiUrl}/users`),
      axios.get(`${apiUrl}/transactions`)
    ]);

    // Encontrar o usuário
    const usuarios = usuariosResponse.data
    const transacoes = transacoesResponse.data;

    const usuario = usuarios.find(user => user.id === usuarioId);

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    
    // Encontrar as transações do usuário
    const transacoesUsuario = transacoes.find(trans => trans.id === usuarioId);
    if (!transacoesUsuario) {
      throw new Error('Transações não encontradas');
    }
    
    // Formatando as transações
    let extrato = `
--------------------------------------------------
                     Bitbank
--------------------------------------------------
Data        Descrição             Valor(R$)
--------------------------------------------------\n`;

    // let saldoAtual = usuario.saldo;
    
    for (let i = 0; i < transacoesUsuario.transacao.length; i++) {
      const descricao = transacoesUsuario.transacao[i];
      const valor = transacoesUsuario.valor[i];
      
      // Formatando a linha do extrato
      const valorFormatado = formatarValor(valor);
      const descricaoFormatada = descricao.padEnd(20, ' ');
      extrato += `2024-07-30  ${descricaoFormatada}  ${valorFormatado > 0 ? '+' : ''}${valorFormatado}\n`;
    }

    // Adicionando o saldo final ao extrato
    extrato += `
--------------------------------------------------
Saldo Atual:                      ${formatarValor(usuario.saldo)}
--------------------------------------------------
`;

    console.log(extrato);
  } catch (error) {
    console.error('Erro ao gerar o extrato:', error);
  }
};
// gerarExtrato('xG31t2YhD9')

// gerarExtrato('ukIcZpX2c8'); 
module.exports = {
  gerarExtrato
};