// src/controllers/driverController.js
const driverService = require('../services/driverService');

class DriverController {
  // Listar motoristas
  async listarMotoristas(req, res) {
    try {
      const results = await driverService.listarMotoristas();
      res.json(results);
    } catch (error) {
      console.error('Erro ao listar motoristas:', error);
      res.status(500).json({ error: 'Erro ao listar motoristas' });
    }
  }

  // Criar motorista
  async criarMotorista(req, res) {
    const { company_id, city, first_name, last_name, email, phone, avatar_url, status } = req.body;
    try {
      const insertId = await driverService.criarMotorista(company_id, city, first_name, last_name, email, phone, avatar_url, status);
      res.status(201).json({ id: insertId });
    } catch (error) {
      console.error('Erro ao criar motorista:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Atualizar motorista
  async atualizarMotorista(req, res) {
    const { id } = req.params;
    const { company_id, city, first_name, last_name, email, phone, avatar_url, status } = req.body;
    try {
      const affectedRows = await driverService.atualizarMotorista(id, company_id, city, first_name, last_name, email, phone, avatar_url, status);
      if (affectedRows === 0) {
        res.status(404).json({ error: 'Motorista não encontrado' });
        return;
      }
      res.json({ message: 'Motorista atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar motorista:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Deletar motorista
  async deletarMotorista(req, res) {
    const { id } = req.params;
    try {
      const affectedRows = await driverService.deletarMotorista(id);
      if (affectedRows === 0) {
        res.status(404).json({ error: 'Motorista não encontrado' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar motorista:', error);
      res.status(500).json({ error: 'Erro ao deletar motorista' });
    }
  }

  // Buscar motorista por ID
  async buscarMotoristaPorId(req, res) {
    const { id } = req.params;
    try {
      const driver = await driverService.buscarMotoristaPorId(id);
      if (!driver) {
        res.status(404).json({ error: 'Motorista não encontrado' });
        return;
      }
      res.json(driver);
    } catch (error) {
      console.error('Erro ao buscar motorista:', error);
      res.status(500).json({ error: 'Erro ao buscar motorista' });
    }
  }
}

module.exports = new DriverController();
