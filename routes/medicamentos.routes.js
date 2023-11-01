const {Router} = require('express');
const { getMedicinasStock50,getParacetamolTotal, getMedicamentosCaducados, getTotalVentas,
     getTotalMedicamentosVendidosProveedores , getMedicinasProvA, getMedicamentoCaro, 
     getMedicamentosNoVendidos, getMedicamentosMarzo, getMedicamentoMenVen, 
     getPromedio, getExpiran2024, getNoVendidos, getVen2023,
     getNoVendido2023, getTrimestre, getMayor100
      } = require('../controllers/medicinas.controllers');
const router = Router();

router
.get('/getStockMayor', getMedicinasStock50)
.get('/provA', getMedicinasProvA)
.get('/caro', getMedicamentoCaro)
.get('/paracetamol', getParacetamolTotal)
.get('/totalProv',  getTotalMedicamentosVendidosProveedores )
.get('/totalVentas', getTotalVentas)
.get('/caducados', getMedicamentosCaducados)
.get('/medicamentosNoVendidos', getMedicamentosNoVendidos)
.get('/medicamentosMarzo', getMedicamentosMarzo)
.get('/menosVen', getMedicamentoMenVen)
.get('/promedio', getPromedio)
.get('/expiran2024', getExpiran2024)
.get('/noVen', getNoVendidos)
.get('/ven2023', getVen2023)
.get('/venNo2023', getNoVendido2023)
.get('/trimestre', getTrimestre)
.get('/mayor100', getMayor100)



module.exports = router;