var express = require('express');
var router = express.Router();
var ctrl = require('../controller/app-controller');

router.get('/userIP/:userIP', ctrl.getFollowUserByUserIP);
router.get('/externalIP/:externalIP', ctrl.getExternalIP);
router.get('/country/:chart-data', ctrl.getCountryChartData);
router.get('/statistics/ExternalIP', ctrl.getExternalIPStatistics);
router.get('/statistics/UserIP', ctrl.getIPStatistics);
router.get('/statistics/Username', ctrl.getUsernameStatistics);
router.get('/statistics/PageAccess', ctrl.getPageAccessStatistics);
router.get('/statistics/PageAccess/:userIP', ctrl.getPageAccessByIP);
router.get('/:id', ctrl.getFollowUserByID);
router.get('/', ctrl.getFollowUser);
router.delete('/:id', ctrl.deleteFollowUser);
router.post('/', ctrl.postFollowUser);
router.get('/room/suggest-room', ctrl.getRoomSuggestion);

module.exports = router;
