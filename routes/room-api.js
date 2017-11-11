const cors = require('cors');

var express = require('express');
var router = express.Router();
var Model = require('../models/room-model.js');


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


router.get('/', function (request, response) {
    Model.find({}, function (err, resources) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.send(resources).status(200);
        }
    });
});


router.put('/:id', function (req, res, next) {
    Model.findByIdAndUpdate(req.params.id, req.body, function (err, room) {
        if (err) return next(err);
        else {
            res.json(room);
        }
    });
});


module.exports = router;