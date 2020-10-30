const { Router } = require('express');
const  router = Router();
const { 
    getApp, 
    saveToDB,
    deleteFromDB
} = require('../controllers/wheather.controller');

router.get('/api/', getApp);
router.post('/api/', saveToDB);
router.delete('/api/:id', deleteFromDB);

module.exports = router;