const { MongoClient } = require('mongodb');
const dbConfig = require('../database/config.js');

client = new MongoClient(dbConfig.mongoURL);

    const proveedoresContactos = async (req,res)=>{
        try {
            const db = client.db(dbConfig.dbName);
            const collection = db.collection('Proveedores');
              
            // Realiza la consulta a MongoDB para obtener los datos
            const data = await collection.distinct('contacto');
             
            // Envía la respuesta como JSON
            res.json(data);
            
        } catch (error) {
            res.status(404).json({
                'message':'Ha ocurrido un error'
            })
        }

    };

    
    const proveedoresNoVentas = async (req,res)=>{
        try {
            const db = client.db(dbConfig.dbName);
            const collection = db.collection('Proveedores');
              
            // Realiza la consulta a MongoDB para obtener los datos
            const data = await collection.distinct('contacto');
             
            // Envía la respuesta como JSON
            res.json(data);
            
        } catch (error) {
            res.status(404).json({
                'message':'Ha ocurrido un error'
            })
        }

    };

 const proveedoresMedicamentos = async (req,res)=>{
    try {
        const data = await Proveedores.find();

        res.json(data);
    } catch (error) {
        res.status(404).json({
            'message':'Ha ocurrido un error'
        })
    }


}

module.exports = {
    proveedoresMedicamentos,
    proveedoresContactos,
    proveedoresNoVentas    
}