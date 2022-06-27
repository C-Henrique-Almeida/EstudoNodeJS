const http = require("http");
const { request } = require('https');

http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });

  if (request.url === "/produto") {
    response.end(
      JSON.stringify({
        message: "Rota de Produto"
      })
    )
  } else if (request.url === "/usuario") {
    response.end(JSON.stringify({
      message: "Rota de usuario"
    }))
  } else (response.end(JSON.stringify({
    message: "Qualquer outra rota"
  })));





}).listen(4001, () => console.log("servidor está rodando na porta 4001"));