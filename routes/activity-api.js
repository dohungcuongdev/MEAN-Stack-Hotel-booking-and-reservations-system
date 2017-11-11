var express = require('express');
var router = express.Router();
var Model = require('../models/activity-model');

router.get('/username/:username', function(request, response) {
    var username = request.params.username;
    Model.findActivityByUserName(username, function(err, res) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.send(res).status(200);
        }
    });
});

router.get('/:id', function (request, response) {
    var id = request.params.id;
    Model.findById(id, function (err, res) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.json(res);
        }
    });
});

router.get('/feedback-room/:id', function (request, response) {
    var id = request.params.id;
    Model.findFeedbackRoom(id, function(err, res) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.send(res).status(200);
        }
    });
});


router.get('/', function(request, response) {
    Model.find({}, function(err, resources) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.send(resources).status(200);
        }
    });
});

router.delete('/:id', function(request, response) {
    var id = request.params.id;
    Model.remove({ _id: id }, function(err, resource) {
        if (err) {
            return response.send(err);
        } else {
            response.send(resource);
        }
    })
});

router.post('/', function(request, response) {
    var activity = new Model(request.body);
    activity.save(function(err, resource) {
        if (err) {
            response.send(err).status(501);
        } else {
            response.json(resource).status(201);
        }
    });
});


module.exports = router;