// vehicleController.js
const connection = require('../connectionDB/connectionDB');

class VehicleController {
  // Listar veículos
  async listarVeiculos(req, res) {
    try {
      const [results] = await connection.query('SELECT * FROM vehicle');
      res.json(results);
    } catch (error) {
      console.error('Erro ao listar veículos:', error);
      res.status(500).json({ error: 'Erro ao buscar dados' });
    }
  }

  // Criar veículo
  async criarVeiculo(req, res) {
    const { plate, model, type, capacity, driver_id } = req.body;
    const query = `
      INSERT INTO vehicle (plate, model, type, capacity, driver_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    try {
      const [results] = await connection.query(query, [plate, model, type, capacity, driver_id]);
      res.status(201).json({ id: results.insertId });
    } catch (error) {
      console.error('Erro ao criar veículo:', error);
      res.status(500).json({ error: 'Erro ao criar veículo' });
    }
  }

  // Atualizar veículo
  async atualizarVeiculo(req, res) {
    const { id } = req.params;
    const { plate, model, type, capacity, driver_id } = req.body;
    const query = `
      UPDATE vehicle
      SET plate = ?, model = ?, type = ?, capacity = ?, driver_id = ?
      WHERE id = ?
    `;
    try {
      const [results] = await connection.query(query, [plate, model, type, capacity, driver_id, id]);
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Veículo não encontrado' });
        return;
      }
      res.json({ message: 'Veículo atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar veículo:', error);
      res.status(500).json({ error: 'Erro ao atualizar veículo' });
    }
  }

  // Deletar veículo
  async deletarVeiculo(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM vehicle WHERE id = ?';
    try {
      const [results] = await connection.query(query, [id]);
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Veículo não encontrado' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar veículo:', error);
      res.status(500).json({ error: 'Erro ao deletar veículo' });
    }
  }

  // Buscar veículos por motorista
  async buscarPorMotorista(req, res) {
    const { driver_id } = req.params;
    const query = `
      SELECT v.id AS vehicle_id, v.plate, v.model, v.type, v.capacity,
             d.id AS driver_id, d.first_name, d.last_name, d.email, d.phone
      FROM vehicle v
      JOIN driver d ON v.driver_id = d.id
      WHERE v.driver_id = ?
    `;
    try {
      const [results] = await connection.query(query, [driver_id]);
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
