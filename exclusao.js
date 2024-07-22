//Precisa do axios e do json-server para funcionar 
const readlineSync = require("readline-sync");
//const fs = require("fs");
const { default: axios } = require("axios");

console.log("Bem vindo a exclusão de usuario\nI nfelizmente voce esta nos deixando")
const idUsuario = readlineSync.question(`Digite o seu id: `)

function exclusao(id) {
  axios
    .delete(`http://localhost:3000/users/${id}`)
    .then(() => console.log("Usuario excluido"));
}

exclusao(idUsuario);


