const express = require('express');
const { MongoClient } = require('mongodb');
const dbConfig = require('../database/config.js');

class Server{

  constructor(){

    this.app = express();
    this.port = process.env.PORT;

    this.paths = {

      medicamentos : "/api/medicamentos",
      proveedores: "/api/proveedores",
      compras: "/api/compras",
      ventas: "/api/ventas",
      pacientes: "/api/pacientes",
      empleados: "/api/empleados"
    }


    this.routes();

    this.ConnectionDB();

  }

  async ConnectionDB(){
   // Conexión a MongoDB utilizando la configuración de dbConfig
   try {
    this.client = new MongoClient(dbConfig.mongoURL);
    await this.client.connect();
    this.db = this.client.db(dbConfig.dbName);
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }

  }

  routes(){

    this.app.use(this.paths.medicamentos, require('../routes/medicamentos.routes.js'))
    this.app.use(this.paths.proveedores, require('../routes/proveedores.routes.js'))
    this.app.use(this.paths.compras, require('../routes/compras.routes.js'))
    this.app.use(this.paths.ventas, require('../routes/ventas.routes.js'))
    this.app.use(this.paths.pacientes, require('../routes/pacientes.routes.js'))
    this.app.use(this.paths.empleados, require('../routes/empleados.routes.js'))

  }



  listen(){
    this.app.listen(this.port, ()=>{
      console.log(`Server it's listening in port: ${this.port}`);
    });
  }

};

module.exports = Server;