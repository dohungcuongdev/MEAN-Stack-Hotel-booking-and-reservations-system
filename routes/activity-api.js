var express = require('express');
var router = express.Router();
var ctrl = require('../controller/app-controller');

router.get('/:id', ctrl.getActivityByID);
router.get('/username/:username', ctrl.getActivityByUserName);
router.get('/feedback-room/:id', ctrl.getActivityFeedBackRoom);
router.get('/response/not-yet', ctrl.getNotResponseActivity);
router.get('/', ctrl.getActivity);
router.delete('/:id', ctrl.deleteActivity);
router.post('/', ctrl.postActivity);

router.put('/', ctrl.putActivity);

module.exports = router;