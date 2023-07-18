'use strict';

var server = require('server');

server.get('Show', server.middleware.https, function (req, res, next) {
  var actionUrl = dw.web.URLUtils.url('newsletter-Handler');
  var newsletterForm = server.forms.getForm('newsletter');
  newsletterForm.clear();

  res.render('/newsletter/newslettersignup', {
    actionUrl: actionUrl,
    newsletterForm: newsletterForm
  });
  next();
}
);

module.exports = server.exports();