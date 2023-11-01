const {Router} = require('express');
const { getEmpleados5, getMenos2023} = require('../controllers/empleados.controllers');
const router = Router();

router.get('/empleados5', getEmpleados5 )
.get('/menos2023', getMenos2023)



module.exports = router;