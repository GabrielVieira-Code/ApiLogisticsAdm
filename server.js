// index.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const router = require('./src/rotas/vehicleRoutes');

const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});