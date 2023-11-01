const {Router} = require('express');
const { getMedicinasStock50 } = require('../controllers/medicinas.controllers');
const router = Router();

router.get('/getStockMayor', getMedicinasStock50);



module.exports = router;