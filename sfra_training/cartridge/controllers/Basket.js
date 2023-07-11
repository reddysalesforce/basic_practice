'use strict';

var server = require('server');

server.get('Show',function(req, res, next){
    var BasketMgr = require('dw/order/BasketMgr');
    var currentBasket = BasketMgr.getCurrentBasket();
    res.render('basket',{basket:currentBasket});
    next();
});

module.exports = server.exports();