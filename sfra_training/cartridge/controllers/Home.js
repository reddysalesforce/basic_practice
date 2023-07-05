'use strict';

/**
 * @namespace Home
 */

var server = require('server');
server.extend(module.superModule);
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');


server.prepend('Show', cache.applyDefaultCache, function (req, res, next) {
    var viewData = res.getViewData();
    viewData.param1 = 'This is from prepend';
    res.setViewData(viewData);
    next();
});

server.append('Show', cache.applyDefaultCache, function(req, res, next){
    var viewData = res.getViewData();
    var appendParam = "This is param from append";
    var queryparam = req.querystring.param ? req.querystring.param : "no paramter was passed";
    res.setViewData({
        param1 : viewData.param1 + ' AND ' + appendParam + ' AND querystring param = '+ queryparam
    });
    next();
})

// server.replace('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
//     var Site = require('dw/system/Site');
//     var PageMgr = require('dw/experience/PageMgr');
//     var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

//     pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

//     var page = PageMgr.getPage('homepage');

//     if (page && page.isVisible()) {
//         res.page('homepage');
//     } else {
//         res.render('home/homePage');
//     }
//     var viewData = res.getViewData();
//     viewData.param1 = "this is from prepend";
//     var replaceParam = "This is param from replace";
//     var appendParam = "this is from append param";
//     res.setViewData({
//         param1: viewData.param1 + ' AND ' +  appendParam + ' AND ' + replaceParam
//     });
//     next();
// }, pageMetaData.computedPageMetaData);



module.exports = server.exports();
