var express = require('express');
var router = express.Router();
var ctrl = require('../controller/app-controller');

router.get('/userIP/:userIP', ctrl.getFollowUserByUserIP);
router.get('/externalIP/:externalIP', ctrl.getExternalIP);
router.get('/country/:chart-data', ctrl.getCountryChartData);
router.get('/statistics/externalIP', ctrl.getExternalIPStatistics);
router.get('/statistics/userIP', ctrl.getIPStatistics);
router.get('/statistics/username', ctrl.getUsernameStatistics);
router.get('/:id', ctrl.getFollowUserByID);
router.get('/', ctrl.getFollowUser);
router.delete('/:id', ctrl.deleteFollowUser);
router.post('/', ctrl.postFollowUser);
router.get('/room/suggest-room', ctrl.getRoomSuggestion);

module.exports = router;
