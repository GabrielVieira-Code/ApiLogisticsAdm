// src/repositories/driverRepository.js
const connection = require('../connectionDB/connectionDB');
const DriverModel = require('../models/driverModel');

class DriverRepository {
  // Listar todos os motoristas
  async listarMotoristas() {
    const query = 'SELECT * FROM driver';
    const [results] = await connection.query(query);
    return results;
  }

  // Criar um novo motorista
  async criarMotorista(company_id, city, first_name, last_name, email, phone, avatar_url, status) {
    const driver = new DriverModel(company_id, city, first_name, last_name, email, phone, avatar_url, status, new Date());
    driver.validar();

    const query = `
      INSERT INTO driver (company_id, city, first_name, last_name, email, phone, avatar_url, status, creation_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [results] = await connection.query(query, [company_id, city, first_name, last_name, email, phone, avatar_url, status, driver.creation_date]);
    return results.insertId;
  }

  // Atualizar informações de um motorista
  async atualizarMotorista(id, company_id, city, first_name, last_name, email, phone, avatar_url, status) {
    const driver = new DriverModel(company_id, city, first_name, last_name, email, phone, avatar_url, status, new Date());
    driver.validar();

    const query = `
      UPDATE driver
      SET company_id = ?, city = ?, first_name = ?, last_name = ?, email = ?, phone = ?, avatar_url = ?, status = ?, creation_date = ?
      WHERE id = ?
    `;
    const [results] = await connection.query(query, [company_id, city, first_name, last_name, email, phone, avatar_url, status, driver.creation_date, id]);
    return results.affectedRows;
  }

  // Deletar um motorista
  async deletarMotorista(id) {
    const query = 'DELETE FROM driver WHERE id = ?';
    const [results] = await connection.query(query, [id]);
    return results.affectedRows;
  }

  // Buscar motorista por ID
  async buscarMotoristaPorId(id) {
    const query = 'SELECT * FROM driver WHERE id = ?';
    const [results] = await connection.query(query, [id]);
    return results[0];
  }
}

module.exports = new DriverRepository();
