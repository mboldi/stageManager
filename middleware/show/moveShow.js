/**
 * moveShow
 * description
 */
const requireOption = require('../common').requireOption;

module.exports = function (objectrepository, direction) {

    return function (req, res, next) {
        return next();
    };
};