const {Router} = require('express');
const { getMedicinas1Enero } = require('../controllers/compras.controllers');

const router = Router();

router.get('/getMedicinas1Enero', getMedicinas1Enero);



module.exports = router;