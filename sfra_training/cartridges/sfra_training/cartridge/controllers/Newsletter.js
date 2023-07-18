'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');

server.get('Show', server.middleware.https, function (req, res, next) {
  var actionUrl = dw.web.URLUtils.url('Newsletter-Handler');
  var newsletterForm = server.forms.getForm('newsletter');
  newsletterForm.clear();

  res.render('/newsletter/newslettersignup', {
    actionUrl: actionUrl,
    newsletterForm: newsletterForm
  });
  next();
}
);

server.post(
    'Handler',
    server.middleware.https,
    function (req, res, next) {
        var newsletterForm = server.forms.getForm('newsletter');
        var continueUrl = dw.web.URLUtils.url('Newsletter-Show');

        if (newsletterForm.valid) {
            // Show the success page
            res.json({
                success: true,
                redirectUrl: URLUtils.url('Newsletter-Success').toString()
            });
        } else {
            // Handle server-side validation errors here: this is just an example
            res.setStatusCode(500);
            res.json({
                error: true,
                redirectUrl: URLUtils.url('Error-Start').toString()
            });
        }

        next();
    }
);

server.get(
    'Success',
    server.middleware.https,
    function (req, res, next) {
        res.render('/newsletter/newslettersuccess', {
            continueUrl: URLUtils.url('Newsletter-Show'),
            newsletterForm: server.forms.getForm('newsletter')
        });

        next();
    }
);

module.exports = server.exports();