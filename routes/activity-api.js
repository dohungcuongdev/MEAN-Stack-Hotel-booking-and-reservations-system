var express = require('express');
var router = express.Router();
var ctrl = require('../controller/app-controller');

router.get('/', ctrl.getActivity);
router.get('/:id', ctrl.getActivityByID);
router.get('/username/:username', ctrl.getActivityByUserName);
router.get('/feedback-room/:id', ctrl.getActivityFeedBackRoom);
router.get('/feedback/hotel', ctrl.getActivityFeedBackHotel);
router.get('/response/not-yet', ctrl.getNotResponseActivity);
router.get('/seen-notification/:id', ctrl.seenAndGetNotification);
router.get('/reply-notification/:id', ctrl.replyAndGetNotification);
router.post('/', ctrl.postActivity);
router.delete('/:id', ctrl.deleteActivity);

module.exports = router;