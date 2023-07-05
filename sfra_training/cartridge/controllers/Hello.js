'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');

server.get('Show',cache.applyDefaultCache,function(req,res,next){
    var Site = require('dw/system/Site');
    var param2Data = req.querystring.param2;
    res.render('helloWorld',{param1: Site.current.name, param2: param2Data});
    next();
});

module.exports = server.exports();