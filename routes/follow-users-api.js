var express = require('express');
var router = express.Router();
var ctrl = require('../controller/app-controller');

router.get('/', ctrl.getFollowUser);
router.get('/:id', ctrl.getFollowUserByID);
router.get('/page/:page', ctrl.getFollowUserByPage);
router.get('/count/page', ctrl.getNumPageTracking);
router.get('/sort/:field_name', ctrl.getSortedTrackingData);
router.get('/:fieldname/:sort/:page', ctrl.getSortedTrackingData2);
router.get('/search/total-page/:fieldname/:keyword', ctrl.searchTotalPage);
router.get('/search/all/:fieldname/:keyword/:sort/:page', ctrl.searchTrackingData);
router.get('/userIP/:userIP', ctrl.getFollowUserByUserIP);
router.get('/externalIP/:externalIP', ctrl.getExternalIP);
router.get('/country/chart-data', ctrl.getCountryChartData);
router.get('/statistics/ExternalIP', ctrl.getExternalIPStatistics);
router.get('/statistics/UserIP', ctrl.getIPStatistics);
router.get('/statistics/Username', ctrl.getUsernameStatistics);
router.get('/statistics/PageAccess', ctrl.getPageAccessStatistics);
router.get('/statistics/PageAccess/userIP/:userIP', ctrl.getPageAccessByIP);
router.get('/statistics/PageAccess/username/:username', ctrl.getPageAccessByUsername);
router.delete('/:id', ctrl.deleteFollowUser);
router.post('/', ctrl.postFollowUser);
router.get('/rooms/suggest-room', ctrl.getRoomSuggestion);

module.exports = router;
