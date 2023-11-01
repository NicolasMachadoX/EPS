const { MongoClient } = require('mongodb');
const dbConfig = require('../database/config.js');


client = new MongoClient(dbConfig.mongoURL);

const getEmpleados5 = async(req,res)=>{
    try {
      const db = client.db(dbConfig.dbName);
      const collection = db.collection('Ventas');

      const result = await collection.aggregate([
          {
              $group: {
                  _id: "$empleado.nombre",
                  totalVentas: { $sum: 1 }
              }
          },
          {
              $match: {
                  totalVentas: { $gt: 5 }
              }
          }
      ]).toArray();

      res.json(result);
  
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
  
  }

  
const getMenos2023 = async(req,res)=>{
    try {
      const db = client.db(dbConfig.dbName);
      const ventasCollection = db.collection('Ventas');

        const inicio= new Date('2023-01-01');
        const fin = new Date('2023-12-31');

        const empleadosMenosDe5Ventas = await ventasCollection.aggregate([
            
        ]).toArray();

        res.json(empleadosMenosDe5Ventas);
  
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
  
  }

module.exports = {
    getEmpleados5,
    getMenos2023

}