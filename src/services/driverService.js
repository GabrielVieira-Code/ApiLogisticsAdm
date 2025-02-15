// src/services/driverService.js
const driverRepository = require('../repositories/driverRepository');

class DriverService {
  // Listar motoristas
  async listarMotoristas() {
    return await driverRepository.listarMotoristas();
  }

  // Criar motorista
  async criarMotorista(company_id, city, first_name, last_name, email, phone, avatar_url, status) {
    return await driverRepository.criarMotorista(company_id, city, first_name, last_name, email, phone, avatar_url, status);
  }

  // Atualizar motorista
  async atualizarMotorista(id, company_id, city, first_name, last_name, email, phone, avatar_url, status) {
    return await driverRepository.atualizarMotorista(id, company_id, city, first_name, last_name, email, phone, avatar_url, status);
  }

  // Deletar motorista
  async deletarMotorista(id) {
    return await driverRepository.deletarMotorista(id);
  }

  // Buscar motorista por ID
  async buscarMotoristaPorId(id) {
    return await driverRepository.buscarMotoristaPorId(id);
  }
}

module.exports = new DriverService();
