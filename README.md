# Vehicle Management API

Esta API foi criada para gerenciar informações sobre veículos e motoristas. Ela permite realizar operações CRUD (Criar, Ler, Atualizar e Deletar) para os veículos e buscar motoristas registrados.

## Tecnologias Usadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework web para Node.js.
- **MySQL**: Banco de dados relacional para armazenar os dados dos veículos e motoristas.
- **Axios (opcional)**: Cliente HTTP para testar as rotas.
- **Postman (opcional)**: Ferramenta para testar a API.

## Estrutura do Projeto

.
├── src/                       
│   ├── controllers/            
│   │   ├── driverController.js 
│   │   ├── vehicleController.js 
│   ├── models/                 
│   │   ├── driverModel.js      
│   │   ├── vehicleModel.js     
│   ├── repositories/           
│   │   ├── driverRepository.js 
│   │   ├── vehicleRepository.js 
│   ├── routes/                 
│   │   ├── driverRoutes.js     
│   │   ├── vehicleRoutes.js    
│   ├── services/               
│   │   ├── driverService.js    
│   │   ├── vehicleService.js   
├── .env                        
├── index.js                    
├── package.json                
├── README.md                   

bash
Copiar
Editar

## Endpoints

### **Motoristas**

- **Listar motoristas**  
  **GET** `/api/drivers`  
  Retorna a lista de todos os motoristas cadastrados.

- **Criar motorista**  
  **POST** `/api/drivers`  
  Cria um novo motorista.  
  **Body**:  
  ```json
  {
    "company_id": 1,
    "city": "São Paulo",
    "first_name": "João",
    "last_name": "Silva",
    "email": "joao.silva@gmail.com",
    "phone": "+551199999999",
    "avatar_url": "http://example.com/avatar.jpg",
    "status": "ativo"
  }
