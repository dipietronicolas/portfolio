const { Router } = require('express');
const router = Router();
const {
    getWheatherApp,
    getChatRoom,
    getCV
} = require('../controllers/portfolio.controller');

router.get('/weather/', getWheatherApp);
router.get('/chat/', getChatRoom);
router.get('/resume/', getCV);

module.exports = router;