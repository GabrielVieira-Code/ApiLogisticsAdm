// services/vehicleService.js
const VehicleRepository = require('../repositories/vehicleRepository');

class VehicleService {
  constructor() {
    this.repository = VehicleRepository;
  }

  async listarVeiculos() {
    return await this.repository.listarVeiculos();
  }

  async criarVeiculo(dados) {
    return await this.repository.criarVeiculo(dados);
  }

  async atualizarVeiculo(id, dados) {
    return await this.repository.atualizarVeiculo(id, dados);
  }

  async deletarVeiculo(id) {
    await this.repository.deletarVeiculo(id);
  }

  async buscarPorMotorista(driver_id) {
    return await this.repository.buscarPorMotorista(driver_id);
  }
}

module.exports = new VehicleService();




