/**
 * auth middleware
 * description
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(typeof req.session.userid !== 'undefined') {
            return next();
        }
        else {
            return res.redirect('/login');
        }

    };
};