// src/services/vehicleService.js
const vehicleRepository = require('../repositories/vehicleRepository');

class VehicleService {
  async listarVeiculos() {
    return await vehicleRepository.listarVeiculos();
  }

  async criarVeiculo(plate, model, type, capacity, driver_id) {
    return await vehicleRepository.criarVeiculo(plate, model, type, capacity, driver_id);
  }

  async atualizarVeiculo(id, plate, model, type, capacity, driver_id) {
    return await vehicleRepository.atualizarVeiculo(id, plate, model, type, capacity, driver_id);
  }

  async deletarVeiculo(id) {
    return await vehicleRepository.deletarVeiculo(id);
  }

  async buscarPorMotorista(driver_id) {
    return await vehicleRepository.buscarPorMotorista(driver_id);
  }
}

module.exports = new VehicleService();
