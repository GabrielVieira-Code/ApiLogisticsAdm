// repositories/vehicleRepository.js
const VehicleModel = require('../models/vehicleModel');

class VehicleRepository {
  constructor() {
    this.vehicleModel = VehicleModel;
  }

  async listarVeiculos() {
    return await this.vehicleModel.findAll();
  }

  async criarVeiculo(dados) {
    return await this.vehicleModel.create(
      dados.plate,
      dados.model,
      dados.type,
      dados.capacity,
      dados.driver_id
    );
  }

  async atualizarVeiculo(id, dados) {
    const resultado = await this.vehicleModel.update(
      id,
      dados.plate,
      dados.model,
      dados.type,
      dados.capacity,
      dados.driver_id
    );

    if (resultado.affectedRows === 0) {
      throw new Error('Veículo não encontrado');
    }

    return await this.vehicleModel.findById(id);
  }

  async deletarVeiculo(id) {
    const resultado = await this.vehicleModel.delete(id);
    
    if (resultado.affectedRows === 0) {
      throw new Error('Veículo não encontrado');
    }
  }

  async buscarPorMotorista(driver_id) {
    if (!driver_id) {
      throw new Error('O ID do motorista é obrigatório.');
    }
    const veiculos = await this.vehicleModel.findByDriverId(driver_id);
    
    if (veiculos.length === 0) {
      throw new Error('Nenhum veículo encontrado para este motorista');
    }

    return veiculos;
  }
}

module.exports = VehicleRepository;