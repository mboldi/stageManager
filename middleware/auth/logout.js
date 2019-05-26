/**
 * logout
 * description
 */
const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        req.session.destroy(function(err) {
            return next();
        });
    };
};