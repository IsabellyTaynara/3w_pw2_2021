const express = require("express");
const server = express();
const mysql = require("mysql2");
const banco = mysql.createPool({
  user: "root",
  password: "",
  database: "3w_202",
  host: "localhost",
  port: "3306",
});

server.get('/clientes', (req, res) =>{
  const SQL = "SELECT * FROM clientes"
  
  banco.getConnection((erro, conexao) => {
    if(erro){
      return res.status(500).send({
        mensagem: 'Erro no servidor',
        detalhes: erro
      })
    }

    conexao.query(SQL, (erro, resultados) => {
      conexao.release()

      if(erro){
        return res.status(500).send({
          mesagem: 'Erro na consulta',
          detalhes: erro
        })
      }

      return res.status(200).send({
        mensagem: 'Dados retornados com sucesso',
        datalhes: resultados
      })
    })
  })
})
server.get("/testarconexao", (req, res, next) => {
  banco.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        mensagem: "Erro no servidor",
        detalhes: error,
      });
    }

    conn.release();

    return res.status(200).send({
      mensagem: "Conexão estabelecida com sucesso!",
    });
  });
});

server.get("/", (req, res, next) => {
  return res.status(200).send({
    mensagem: "Servidor funcionando!",
  });
});

server.listen(3000, () => {
  console.log("Executando");
});


