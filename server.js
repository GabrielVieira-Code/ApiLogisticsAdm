const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');
const app = express();

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);

   
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// Rota GET para buscar dados
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM vehicle';
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Erro ao executar a query:', error);
          res.status(500).json({ error: 'Erro ao buscar dados' });
          return;
      }
      res.json(results);
  });
});

// Middleware para parsing de JSON
app.use(express.json());

// Drivers Routes
// POST - Criar novo veículo
app.post('/data', (req, res) => {
  const { plate, model, type, capacity, driver_id } = req.body;
  
  const query = `
      INSERT INTO vehicle (plate, model, type, capacity, driver_id)
      VALUES (?, ?, ?, ?, ?)
  `;
  
  connection.query(query, [plate, model, type, capacity, driver_id], (error, results) => {
      if (error) {
          console.error('Erro ao criar veículo:', error);
          res.status(500).json({ error: 'Erro ao criar veículo' });
          return;
      }
      res.status(201).json({ id: results.insertId });
  });
});

// PUT - Atualizar veículo existente
app.put('/data/:id', (req, res) => {
  const { id } = req.params;
  const { plate, model, type, capacity, driver_id } = req.body;
  
  const query = `
      UPDATE vehicle 
      SET plate = ?, model = ?, type = ?, capacity = ?, driver_id = ?
      WHERE id = ?
  `;
  
  connection.query(query, [plate, model, type, capacity, driver_id, id], (error, results) => {
      if (error) {
          console.error('Erro ao atualizar veículo:', error);
          res.status(500).json({ error: 'Erro ao atualizar veículo' });
          return;
      }
      if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Veículo não encontrado' });
          return;
      }
      res.json({ message: 'Veículo atualizado com sucesso' });
  });
});

// DELETE - Deletar veículo
app.delete('/data/:id', (req, res) => {
  const { id } = req.params;
  
  const query = 'DELETE FROM vehicle WHERE id = ?';
  
  connection.query(query, [id], (error, results) => {
      if (error) {
          console.error('Erro ao deletar veículo:', error);
          res.status(500).json({ error: 'Erro ao deletar veículo' });
          return;
      }
      if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Veículo não encontrado' });
          return;
      }
      res.status(204).send();
  });
});
// Método GET para buscar veículos pelo driver_id
// Rota GET para buscar veículos por driver_id (SEM async/await)
app.get('/vehicles/:driver_id', (req, res) => {
  const { driver_id } = req.params;

  if (!driver_id) {
    return res.status(400).json({ error: 'O ID do motorista é obrigatório.' });
  }

  const query = `
    SELECT 
      v.id AS vehicle_id,
      v.plate,
      v.model,
      v.type,
      v.capacity,
      v.creation_date AS vehicle_creation_date,
      d.id AS driver_id,
      d.first_name,
      d.last_name,
      d.email,
      d.phone
    FROM vehicle v
    JOIN driver d ON v.driver_id = d.id
    WHERE v.driver_id = ?;
  `;

  connection.query(query, [driver_id], (error, results) => {
    if (error) {
      console.error('Erro ao buscar veículos:', error);
      return res.status(500).json({ error: 'Erro ao buscar os veículos' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Nenhum veículo encontrado para este motorista' });
    }

    res.status(200).json(results);
  });
});



// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});