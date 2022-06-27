const { request, response } = require('express');
const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();

app.use(express.json());

let usuarios = [];

fs.readFile("usuarios.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    usuarios = JSON.parse(data);
  }
})
/*
POST => INSERIR DADOS
GET => BUSCA DADOS
PUT => ALTERAR DADOS
DELETE => REMOVER DADOS
*/
/* 
body sempre que eu quiser enviar dados para a minha aplicação
params(?) /user/53156163
query /user?id=41451651651651561&value=65165165*/

app.post("/usuarios", (request, response) => {
  //nome e preço
  const { email, senha } = request.body;

  /*const confirmation = email.indexOf("@");
  if (confirmation == -1) {
    console.log("Erro");
    const user = {}
  } else {
    const user = {
      email,
      senha,
      id: randomUUID(),
    }
  }*/
  const user = {
    email,
    senha,
    id: randomUUID(),
  }

  usuarios.push(user)

  productFile();

  return response.json(user);
});

app.get("/usuarios", (request, response) => {
  return response.json(usuarios);
});

app.get("/usuarios/:id", (request, response) => {
  const { id } = request.params;
  const user = usuarios.find(user => user.id === id);
  return response.json(user);
});

app.put("/usuarios/:id", (request, response) => {
  const { id } = request.params;
  const { email, senha } = request.body;

  const productIndex = usuarios.findIndex(user => user.id === id);
  usuarios[productIndex] = {
    ...usuarios[productIndex],
    email,
    senha
  };

  productFile();

  return response.json({ message: "produto alterado com sucesso" })
});

app.delete("/usuarios/:id", (request, response) => {
  const { id } = request.params;

  const productIndex = usuarios.findIndex(user => user.id === id);

  usuarios.splice(productIndex, 1);

  productFile();

  return response.json({ message: "produto removido com sucesso" })
});


function productFile() {
  fs.writeFile("usuarios.json", JSON.stringify(usuarios), (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log("Produto inserido");
    }
  });
}

app.listen(4002, () => console.log("servidor está rodando na porta 4002"));