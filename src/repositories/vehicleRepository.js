// src/repositories/vehicleRepository.js
const connection = require('../connectionDB/connectionDB');
const VehicleModel = require('../models/vehicleModel');

class VehicleRepository {
  async listarVeiculos() {
    const [results] = await connection.query('SELECT * FROM vehicle');
    return results;
  }

  async listarDrivers() {
    const [results] = await connection.query('SELECT * FROM driver');
    return results;
  }

  async criarVeiculo(plate, model, type, capacity, driver_id) {
    // Criando uma instância do modelo para validar os dados
    const veiculo = new VehicleModel(plate, model, type, capacity, driver_id);
    veiculo.validar();  // Valida os dados

    const query = `
      INSERT INTO vehicle (plate, model, type, capacity, driver_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [results] = await connection.query(query, [plate, model, type, capacity, driver_id]);
    return results.insertId;
  }

  async atualizarVeiculo(id, plate, model, type, capacity, driver_id) {
    const veiculo = new VehicleModel(plate, model, type, capacity, driver_id);
    veiculo.validar();

    const query = `
      UPDATE vehicle
      SET plate = ?, model = ?, type = ?, capacity = ?, driver_id = ?
      WHERE id = ?
    `;
    const [results] = await connection.query(query, [plate, model, type, capacity, driver_id, id]);
    return results.affectedRows;
  }

  async deletarVeiculo(id) {
    const query = 'DELETE FROM vehicle WHERE id = ?';
    const [results] = await connection.query(query, [id]);
    return results.affectedRows;
  }

  async buscarPorMotorista(driver_id) {
    const query = `
      SELECT v.id AS vehicle_id, v.plate, v.model, v.type, v.capacity,
             d.id AS driver_id, d.first_name, d.last_name, d.email, d.phone
      FROM vehicle v
      JOIN driver d ON v.driver_id = d.id
      WHERE v.driver_id = ?
    `;
    const [results] = await connection.query(query, [driver_id]);
    return results;
  }
}

module.exports = new VehicleRepository();
