const {Router} = require('express');
const { proveedoresMedicamentos, proveedoresContactos, proveedoresNoVentas } = require('../controllers/proveedores.controllers');
const router = Router();

router.get('/proveedoresMed', proveedoresMedicamentos).get('/noVentas', proveedoresNoVentas);
router.get('/contactos', proveedoresContactos);




module.exports = router;