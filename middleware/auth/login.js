/**
 * login
 * description
 */
const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(typeof req.query.password !== 'undefined') {
            if(req.query.password === 'szinpad'){
                req.session.userid = 'user';
                return res.redirect('/prod/actual')
            }
        }
        else{
            return next();
        }
    };
};