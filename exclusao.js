//Precisa do axios e do json-server para funcionar 
const readlineSync = require("readline-sync");
const { default: axios } = require("axios");

console.log("Bem vindo a exclusão de usuario\nInfelizmente voce esta nos deixando")

//recebe o id do login como paramentro 
function exclusao(idLogin) {
  const idUsuario = readlineSync.question(`Confirme o seu id: `)
  //confirmacao do id para termos certeza que e o usuario fazendo a exclusao da conta
  if(idLogin != idUsuario){
    throw new console.error('Id invalido');
  }
  axios
    .delete(`http://localhost:3000/users/${idLogin}`)
    axios
    .delete(`http://localhost:3000/transactions/${idLogin}`)
    .then(() => console.log("Usuario excluido"));
}



