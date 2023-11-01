const { MongoClient } = require('mongodb');
const dbConfig = require('../database/config.js');


client = new MongoClient(dbConfig.mongoURL);





const getMedicinas1Enero = async (req,res)=>{
    try {
      const db = client.db(dbConfig.dbName);
      const compras = db.collection('Compras');
  
      const primeroEnero = new Date("2024-01-01")
  
      const data = await compras.aggregate([
        {
          $match: {
            fechaCompra: { $lt: primeroEnero }
          }
        }
      ]).toArray();
  
    
        res.json(data);
    } catch (error) {
        res.status(404).json({
            'message':'Ha ocurrido un error'
        })
    }
  
  
  }

  module.exports =
  {
    getMedicinas1Enero
  };


  