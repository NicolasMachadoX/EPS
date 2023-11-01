const {Router} = require('express');
const { getNoCompradas, getPacientesParacetamol } = require('../controllers/ventas.controllers');
const router = Router();

router.get('/medicinasNoCompradas', getNoCompradas ).get('/pacientesParacetamol', getPacientesParacetamol);



module.exports = router;