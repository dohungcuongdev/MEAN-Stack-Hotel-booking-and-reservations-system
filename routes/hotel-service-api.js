

var express = require('express');
var router = express.Router();
var Model = require('../models/hotel-service-model');


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


router.put('/:id', function(req, res, next) {
  Model.findByIdAndUpdate(req.params.id, req.body, function (err, service) {
    if (err) return next(err);
    res.json(service);
  });
});


module.exports = router;