var express = require('express');
var router = express.Router();
var ctrl = require('../controller/app-controller');

router.get('/:id', ctrl.getSerivceByID);
router.get('/', ctrl.getService);
router.put('/:id', ctrl.putService);

module.exports = router;