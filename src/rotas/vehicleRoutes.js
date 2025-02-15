// vehicleRoutes.js
const express = require('express');
const VehicleController = require('../controllers/vehicleController');
const router = express.Router();

// Rota GET para listar veículos
router.get('/data', VehicleController.listarVeiculos);

router.get('/data/driver', VehicleController.listarVeiculos);


// Rota POST para criar um novo veículo
router.post('/data', VehicleController.criarVeiculo);

// Rota PUT para atualizar um veículo existente
router.put('/data/:id', VehicleController.atualizarVeiculo);

// Rota DELETE para deletar um veículo
router.delete('/data/:id', VehicleController.deletarVeiculo);

// Rota GET para buscar veículos por motorista
router.get('/vehicles/:driver_id', VehicleController.buscarPorMotorista);

module.exports = router;
