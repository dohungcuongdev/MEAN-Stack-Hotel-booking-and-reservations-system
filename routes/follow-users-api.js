var express = require('express');
var router = express.Router();
var ctrl = require('../controller/app-controller');

router.get('/userIP/:userIP', ctrl.getFollowUserByUserIP);
router.get('/externalIP/:externalIP', ctrl.getExternalIP);
router.get('/:id', ctrl.getFollowUserByID);
router.get('/', ctrl.getFollowUser);
router.delete('/:id', ctrl.deleteFollowUser);
router.post('/', ctrl.postFollowUser);
router.get('/room/suggest-room', ctrl.getRoomSuggestion);

module.exports = router;
