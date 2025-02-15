// src/rotas/driverRoutes.js
const express = require('express');
const DriverController = require('../controllers/driverController');
const router = express.Router();

// Rota GET para listar motoristas
router.get('/drivers', DriverController.listarMotoristas);

// Rota POST para criar um novo motorista
router.post('/drivers', DriverController.criarMotorista);

// Rota PUT para atualizar um motorista
router.put('/drivers/:id', DriverController.atualizarMotorista);

// Rota DELETE para deletar um motorista
router.delete('/drivers/:id', DriverController.deletarMotorista);

// Rota GET para buscar um motorista por ID
router.get('/drivers/:id', DriverController.buscarMotoristaPorId);

module.exports = router;
