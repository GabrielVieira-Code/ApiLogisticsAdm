// src/controllers/vehicleController.js
const vehicleService = require('../services/vehicleService');

class VehicleController {
  async listarVeiculos(req, res) {
    try {
      const results = await vehicleService.listarVeiculos();
      res.json(results);
    } catch (error) {
      console.error('Erro ao listar veículos:', error);
      res.status(500).json({ error: 'Erro ao buscar dados' });
    }
  }

  async criarVeiculo(req, res) {
    const { plate, model, type, capacity, driver_id } = req.body;
    try {
      const insertId = await vehicleService.criarVeiculo(plate, model, type, capacity, driver_id);
      res.status(201).json({ id: insertId });
    } catch (error) {
      console.error('Erro ao criar veículo:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async atualizarVeiculo(req, res) {
    const { id } = req.params;
    const { plate, model, type, capacity, driver_id } = req.body;
    try {
      const affectedRows = await vehicleService.atualizarVeiculo(id, plate, model, type, capacity, driver_id);
      if (affectedRows === 0) {
        res.status(404).json({ error: 'Veículo não encontrado' });
        return;
      }
      res.json({ message: 'Veículo atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar veículo:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async deletarVeiculo(req, res) {
    const { id } = req.params;
    try {
      const affectedRows = await vehicleService.deletarVeiculo(id);
      if (affectedRows === 0) {
        res.status(404).json({ error: 'Veículo não encontrado' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar veículo:', error);
      res.status(500).json({ error: 'Erro ao deletar veículo' });
    }
  }

  async buscarPorMotorista(req, res) {
    const { driver_id } = req.params;
    try {
      const results = await vehicleService.buscarPorMotorista(driver_id);
      if (results.length === 0) {
        res.status(404).json({ message: 'Nenhum veículo encontrado para este motorista' });
        return;
      }
      res.json(results);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
      res.status(500).json({ error: 'Erro ao buscar veículos' });
    }
  }
}

module.exports = new VehicleController();
