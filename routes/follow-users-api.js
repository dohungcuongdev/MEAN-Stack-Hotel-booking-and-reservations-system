var express = require('express');
var router = express.Router();
var Model = require('../models/follow-users-model');
const getIP = require('external-ip')();
var geoip = require('geoip-lite');
var externalip = require('externalip');
var roomModel = require('../models/room-model.js');
var ipSuggestModel = require('../models/ip-suggest-model');

'use strict';

router.get('/userIP/:userIP', function (request, response) {
    var userIP = request.params.userIP;
    Model.findByUserIP(userIP, function (err, res) {
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


router.get('/', function (request, response) {
    Model.find({}, function (err, resources) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.send(resources).status(200);
        }
    });
});

router.delete('/:id', function (request, response) {
    var id = request.params.id;
    Model.remove({ _id: id }, function (err, resource) {
        if (err) {
            return response.send(err);
        } else {
            response.send(resource);
        }
    })
});

router.post('/', function (request, response) {
    var follow_users = new Model(request.body);
    var ip_address = getIpAddress();
    externalip((err, external_ip) => {
        if (err) {
            console.log(err)
        } else {
            var geo = geoip.lookup(external_ip);
            follow_users['user_ip_address'] = ip_address;
            follow_users['external_ip_address'] = external_ip;
            follow_users['country'] = geo.country;
            follow_users['city'] = geo.city;
            follow_users.save(function (err, resource) {
                if (err) {
                    response.send(err).status(501);
                } else {
                    response.json(resource).status(201);
                }
            });

            var roomname = '';

            if(follow_users.page_access.includes('room-details')) {
                roomname = follow_users.page_access.substring(26, 29);
            }

            if(follow_users.page_access.includes('click image in rooms')) {
                roomname = follow_users.page_access.substring(22, 25);
            }

            if(follow_users.page_access.includes('book room')) {
                roomname = follow_users.page_access.substring(10, 13);
            }

            if(follow_users.page_access.includes('send feedback for room')) {
                roomname = follow_users.page_access.substring(23, 26);
            }

            if(roomname != '') {
                roomModel.findRoomByRoomName(roomname, function (err, room) {
                    if (err) {
                        console.log(err);
                    } else {
                        ipSuggestModel.findByUserIP(ip_address, function (err, userip) {
                            if (err) {
                                console.log(err);
                            } 
                            var ipSuggest = new ipSuggestModel(
                                {
                                    ip: ip_address,
                                    size: room.size,
                                    price: room.price,
                                    avgAminities: room.avgAminities,
                                    count: 1,
                                });
                                
                            //console.log(room);

                            if(userip) {
                                //console.log("update");
                                ipSuggest.count = userip.count + 1;
                                ipSuggest.size = (userip.size*userip.count + ipSuggest.size)/ipSuggest.count;
                                ipSuggest.price = (userip.price*userip.count + ipSuggest.price)/ipSuggest.count;
                                ipSuggest.avgAminities = (userip.avgAminities*userip.count + ipSuggest.avgAminities)/ipSuggest.count;
                                ipSuggestModel.update(userip._id, ipSuggest);
                            } else {
                                //console.log("insert");
                                ipSuggestModel.add(ipSuggest);
                            }
                        });
                    }
                });
            }
        }
    });
});


router.get('/room/suggest-room', function (request, response) {
    var ip_address = getIpAddress();
    roomModel.find({}, function (err, rooms) {
        if (err) {
            response.send(err).status(404);
        } else {
            ipSuggestModel.findByUserIP(ip_address, function (err, ip_suggest) {
                if (err) {
                    console.log(err);
                } else {
                    var arrP = get4NumNearest(rooms, 'price', ip_suggest.price);
                    var arrS = get4NumNearest(rooms, 'size', ip_suggest.size);
                    var arrA = get4NumNearest(rooms, 'avgAminities', ip_suggest.avgAminities);

                    var roomSuggested = arrP.concat(arrS).concat(arrA).unique();
                    response.send(roomSuggested).status(200);
                }
            });
        }
    });
});


module.exports = router;

function get4NumNearest(rooms, att, value) {
	var temp = [];
	for(var i = 0; i < rooms.length; i++) {
		var attvalue = 0;
		if(att == 'size')
			attvalue = rooms[i].size;
		if(att == 'price') 
			attvalue = rooms[i].price;
		if(att == 'avgAminities') 
			attvalue = rooms[i].avgAminities;	
		temp[i] = Math.abs(attvalue - value);
	}
	var result = getIndicesOfMax(temp, 4);
	var finalresult = [];
	for(var i = 0; i < result.length; i++)
		finalresult[i] = rooms[result[i]];
	return finalresult;
}

function getIndicesOfMax(inp, count) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
        outp.push(i); // add index to output array
        if (outp.length > count) {
            outp.sort(function(a, b) { return inp[a] - inp[b]; }); // descending sort the output array
            outp.pop(); // remove the last index (index of smallest element in output array)
        }
    }
    return outp;
}

Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

function getIpAddress() {
    var ip_address = '';

    var os = require('os');
    var ifaces = os.networkInterfaces();

    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                //console.log(ifname + ':' + alias, iface.address);
                ip_address = iface.address;
            } else {
                // this interface has only one ipv4 adress
                //console.log(ifname, iface.address);
                ip_address = iface.address;
            }
            ++alias;
        });
    });
    return ip_address;
}