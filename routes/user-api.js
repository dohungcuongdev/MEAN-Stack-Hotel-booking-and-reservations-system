

var express = require('express');
var router = express.Router();
var Model = require('../models/user-model.js');


router.get('/:id', function (request, response) {
    var id = request.params.id;
    Model.GetUserByID(id, function (err, res) {
        if (err) {
            return response.send(err);
        } else {
            var user = res;
            response.json(user);
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
    Model.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        if (err) return next(err);
        else {
            res.json(user);
        }
    });
});

module.exports = router;