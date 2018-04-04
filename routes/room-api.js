var express = require('express');
var router = express.Router();
var ctrl = require('../controller/app-controller');

//router.get('/:id', ctrl.getRoomByID);
router.get('/:name', ctrl.getRoomByName);
router.get('/', ctrl.getRoom);
router.put('/:id', ctrl.putRoom);

module.exports = router;