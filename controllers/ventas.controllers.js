const { MongoClient } = require('mongodb');
const dbConfig = require('../database/config.js');


client = new MongoClient(dbConfig.mongoURL);

const getNoCompradas = async (req,res)=>{
    try {
      const db = client.db(dbConfig.dbName);
      const ventas = db.collection('Ventas');
      const medicamentos = db.collection('Medicamentos')
        const data = await ventas.distinct('medicamentosVendidos.nombreMedicamento');
        const data2 = await medicamentos.distinct('nombre');
        const sum = data2.sort().join() === data.sort().join()
        res.json({
            sum
        });
    } catch (error) {
        res.status(404).json({
            'message':'Ha ocurrido un error'
        })
    }


}


const getPacientesParacetamol = async (req,res)=>{
    try {
      const db = client.db(dbConfig.dbName);
      const ventas = db.collection('Ventas'); 
        
        const data = await ventas.aggregate(
          [ { $match: { 'medicamentosVendidos.nombreMedicamento': 'Paracetamol' } }
        ]).toArray();
        
        res.json({
            data
        });
    } catch (error) {
        res.status(404).json({
            'message':'Ha ocurrido un error'
        })
    }


}

module.exports = {

    getNoCompradas,
    getPacientesParacetamol
}