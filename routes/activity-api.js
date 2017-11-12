var express = require('express');
var router = express.Router();
var ctrl = require('../controller/app-controller');

router.get('/username/:username', ctrl.getActivityByUserName);
router.get('/:id', ctrl.getActivityByID);
router.get('/feedback-room/:id', ctrl.getActivityFeedBackRoom);
router.get('/', ctrl.getActivity);
router.delete('/:id', ctrl.deleteActivity);
router.post('/', ctrl.postActivity);

module.exports = router;