// dbConnection.js
const mysql = require('mysql2');
require('dotenv').config();

// Configuração da conexão com o banco de dados MySQL usando createPool para suportar Promises
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
});

// Testar a conexão
connection.getConnection((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// Usando pool de conexões com promessas
module.exports = connection.promise();
