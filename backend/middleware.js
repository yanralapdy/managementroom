const jwt = require('express-jwt');
exports.secret = 'lorhan';

exports.authenticated = jwt({secret: this.secret});
