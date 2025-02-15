// src/models/driverModel.js
class DriverModel {
    constructor(company_id, city, first_name, last_name, email, phone, avatar_url, status, creation_date) {
      this.company_id = company_id;
      this.city = city;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.phone = phone;
      this.avatar_url = avatar_url;
      this.status = status;
      this.creation_date = creation_date;
    }
  
    // Validação simples
    validar() {
      if (!this.first_name || !this.last_name || !this.email || !this.phone) {
        throw new Error('Nome, e-mail e telefone são obrigatórios');
      }
    }
  }
  
  module.exports = DriverModel;
  