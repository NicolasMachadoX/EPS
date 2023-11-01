const { MongoClient } = require('mongodb');
const dbConfig = require('../database/config.js');


client = new MongoClient(dbConfig.mongoURL);



 const getMedicinasStock50 = async (req,res)=>{
    try {
        const db = client.db(dbConfig.dbName);
        const collection = db.collection('Medicamentos');
          
       
        const data = await collection.find({ stock: {$lt:50}}).toArray();
          console.log(data);
   
        res.json(data);
      } catch (error) {
        console.error('Error al obtener datos de MongoDB:', error);
        res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
      }
}

const getMedicamentoCaro = async (req, res) => {
  try {
    const db = client.db(dbConfig.dbName);
    const medicinas = db.collection('Medicamentos');
      
 
    const data = await medicinas.find().sort({ precio: -1 }).limit(1).toArray();
      console.log(data);

    res.json(data);
  } catch (error) {
    console.error('Error al obtener datos de MongoDB:', error);
    res.status(500).json({ error: 'Error al obtener datos de MongoDB' });
  }
  };

const getMedicinasProvA = async (req,res)=>{
    try {
      const db = client.db(dbConfig.dbName);
      const medicinas = db.collection('Medicamentos');
        const data = await medicinas.aggregate(
          [ { $match: { 'proveedor.nombre': 'ProveedorA' } }
        ]).toArray();
        res.json(data);
    } catch (error) {
        res.status(404).json({
            'message':'Ha ocurrido un error'
        })
    }


}




const getParacetamolTotal = async (req,res)=>{
  try {
    const db = client.db(dbConfig.dbName);
    const medicinas = db.collection('Medicamentos');

      const data = await medicinas.find({nombre:"Paracetamol"}).toArray();
      /* const data = await medicinas.aggregate( [
        {
          $group: {
             nombre: "Paracetamol",
             count: { $count: { } }
          }
        }
      ] ).toArray(); */
      res.json(data.length);
  } catch (error) {
      res.status(404).json({
          'message':'Ha ocurrido un error'
      })
  }


}


const getTotalMedicamentosVendidosProveedores = async (req,res)=>{
  try {
    const db = client.db(dbConfig.dbName);
    const medicinas = db.collection('Medicamentos');

    const dataProvA = await medicinas.aggregate(
      [ { $match: { 'proveedor.nombre': 'ProveedorA' } }
    ]).toArray();

    const dataProvB = await medicinas.aggregate(
      [ { $match: { 'proveedor.nombre': 'ProveedorB' } }
    ]).toArray();

    const dataProvC = await medicinas.aggregate(
      [ { $match: { 'proveedor.nombre': 'ProveedorC' } }
    ]).toArray();
  
    res.json({
      mensaje: `ProveedorA vendió ${dataProvA.length} medicamentos, ProveedorB vendió ${dataProvB.length} medicamentos, ProveedorC vendió ${dataProvC.length} medicamentos`,
    });
  }catch(error){
      res.status(404).json({
          'message':'Ha ocurrido un error'
      })
  }


}

const getTotalVentas = async (req,res)=>{
  try {
    const db = client.db(dbConfig.dbName);
    const medicinas = db.collection('Medicamentos');

    const data = await medicinas.distinct('precio');
  
      res.json(`Las ventas totales fueron: ${data.reduce((acumulador, numero) => acumulador + numero, 0)}`);
  } catch (error) {
      res.status(404).json({
          'message':'Ha ocurrido un error'
      })
  }


}

const getMedicamentosCaducados = async (req,res)=>{
  try {
    const db = client.db(dbConfig.dbName);
    const medicinas = db.collection('Medicamentos');

    const primeroEnero = new Date("2023-01-01")

    const data = await medicinas.aggregate([
      {
        $match: {
          fechaExpiracion: { $gt: primeroEnero }
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

const getMedicamentoMenVen = async (req,res) =>{
  try{

   const db = client.db(dbConfig.dbName);
  const collection = db.collection('Ventas');

  const fechaInicio = new Date('2023-01-01T00:00:00.000Z'); 
  const fechaFin = new Date('2023-12-31T23:59:59.999Z');

  const data = await collection.aggregate([
      {
          $match: {
              fechaVenta: {
                  $gte: fechaInicio,
                  $lte: fechaFin
              }
          }
      },
      {
          $unwind: "$medicamentosVendidos"
      },
      {
          $group: {
              _id: "$medicamentosVendidos.nombreMedicamento",
              totalVendido: { $sum: "$medicamentosVendidos.cantidadVendida" }
          }
      },
      {
          $sort: {
              totalVendido: 1
          }
      },
      {
          $limit: 1
      }
  ]).toArray();

  res.json(data[0]);
  
} catch (error) {
  res.status(500).json({ error: error.message });
}

}

const getMedicamentosNoVendidos = async (req, res) => {
  try {
      const db = client.db(dbConfig.dbName);
      const medicamentosCollection = db.collection('Medicamentos');
      const ventasCollection = db.collection('Ventas');

      const medicamentosVendidos = await ventasCollection.distinct('medicamentosVendidos.nombreMedicamento');

      const medicamentosNoVendidos = await medicamentosCollection.find({ nombre: { $nin: medicamentosVendidos } }).toArray();

      res.json(medicamentosNoVendidos);
    
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getMedicamentosMarzo = async (req,res) =>{
  try {
    const db = client.db(dbConfig.dbName);
    const collection = db.collection('Ventas');

        const fechaI = new Date('2023-03-01T00:00:00.000Z');
        const fechaF = new Date('2023-03-31T23:59:59.999Z'); 

        const data = await collection.aggregate([
            {
                $match: {
                    fechaVenta: {
                        $gte: fechaI,
                        $lte: fechaF
                    }
                }
            },
            {
                $unwind: "$medicamentosVendidos"
            },
            {
                $group: {
                    _id: null,
                    totalMedicamentosVendidos: { $sum: "$medicamentosVendidos.cantidadVendida" }
                }
            }
        ]).toArray();

        res.json(data[0].totalMedicamentosVendidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getPromedio = async(req,res)=>{
  const db = client.db(dbConfig.dbName);
  const ventasCollection = db.collection('Ventas');
  const comprasCollection = db.collection('Compras');

  const totalMedicamentos = await comprasCollection.aggregate([
      {
          $unwind: "$medicamentosComprados"
      },
      {
          $group: {
              _id: null,
              totalMedicamentos: { $sum: "$medicamentosComprados.cantidadComprada" }
          }
      }
  ]).toArray();

  const totalV = await ventasCollection.countDocuments();


  const promedio = totalMedicamentos[0].totalMedicamentos / totalV;

  res.json({ promedio });

}


const getExpiran2024 = async(req,res) =>{
  try {
    const db = client.db(dbConfig.dbName);
    const collection = db.collection('Medicamentos');
        const fechaIn = new Date('2024-01-01T00:00:00.000Z');
        const fechaF = new Date('2024-12-31T23:59:59.999Z'); 

        const result = await collection.find({
            fechaExpiracion: {
                $gte: fechaIn,
                $lte: fechaF
            }
        }).toArray();

        res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
}



const getNoVendidos = async(req,res)=>{
  try {
    const db = client.db(dbConfig.dbName);
    const medicamentosCollection = db.collection('Medicamentos');
        const ventasCollection = db.collection('Ventas');

        const medicamentosVendidos = await ventasCollection.distinct('medicamentosVendidos.nombreMedicamento');
        const medicamentosNoVendidos = await medicamentosCollection.find({
            nombre: { $nin: medicamentosVendidos }
        }).toArray();

        res.json(medicamentosNoVendidos);



  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}

const getVen2023 = async(req,res)=>{
  try {
    const db = client.db(dbConfig.dbName);
    const ventasCollection = db.collection('Ventas');

    const inicio2023 = new Date('2023-01-01T00:00:00.000Z');
    const fin2023 = new Date('2023-12-31T23:59:59.999Z');

    const totalMedicamentosPorMes = await ventasCollection.aggregate([
        {
            $match: {
                "fechaVenta": {
                    $gte: inicio2023,
                    $lte: fin2023
                }
            }
        },
        {
            $project: {
                mes: { $month: "$fechaVenta" },
                cantidadVendida: { $sum: "$medicamentosVendidos.cantidadVendida" }
            }
        },
        {
            $group: {
                _id: "$mes",
                total: { $sum: "$cantidadVendida" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]).toArray();

    res.json(totalMedicamentosPorMes);


  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}

const getNoVendido2023 = async(req,res)=>{
  try {
    const db = client.db(dbConfig.dbName);
        const medicamentosCollection = db.collection('Medicamentos');
        const ventasCollection = db.collection('Ventas');

        const inicio2023 = new Date('2023-01-01T00:00:00.000Z');
        const fin2023 = new Date('2023-12-31T23:59:59.999Z');

        const medicamentosVendidos2023 = await ventasCollection.distinct('medicamentosVendidos.nombreMedicamento', {
            "fechaVenta": {
                $gte: inicio2023,
                $lte: fin2023
            }
        });

        const medicamentosNoVendidos2023 = await medicamentosCollection.find({
            "nombreMedicamento": { $nin: medicamentosVendidos2023 }
        }).toArray();

        res.json(medicamentosNoVendidos2023);


  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}



const getTrimestre = async(req,res)=>{
  try {
    const db = client.db(dbConfig.dbName);
    const ventasCollection = db.collection('Ventas');

    const inicioPrimerTrimestre = new Date('2023-01-01T00:00:00.000Z');
    const finPrimerTrimestre = new Date('2023-03-31T23:59:59.999Z');

    const totalMedicamentosPrimerTrimestre = await ventasCollection.aggregate([
        {
            $match: {
                "fechaVenta": {
                    $gte: inicioPrimerTrimestre,
                    $lte: finPrimerTrimestre
                }
            }
        },
        {
            $unwind: "$medicamentosVendidos"
        },
        {
            $group: {
                _id: null,
                totalVendido: { $sum: "$medicamentosVendidos.cantidadVendida" }
            }
        }
    ]).toArray();

    res.json(totalMedicamentosPrimerTrimestre[0].totalVendido);


  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}

const getMayor100 = async(req,res)=>{
  try {
    const db = client.db(dbConfig.dbName);
    const medicamentosCollection = db.collection('Medicamentos');

        const medicamentosFiltrados = await medicamentosCollection.find({
            "precio": { $gt: 50 },
            "stock": { $lt: 100 }
        }).toArray();

        res.json(medicamentosFiltrados);


  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}



module.exports = {
    getMedicinasStock50,
    getMedicinasProvA,  
    getMedicamentoCaro,
    getMedicamentosNoVendidos,
    getParacetamolTotal,
    getTotalMedicamentosVendidosProveedores,
    getTotalVentas,
    getMedicamentosCaducados,
    getMedicamentosMarzo,
    getMedicamentoMenVen,
    getPromedio,
    getExpiran2024,
    getNoVendidos,
    getVen2023,
    getNoVendido2023,
    getTrimestre,
    getMayor100

    
    

}