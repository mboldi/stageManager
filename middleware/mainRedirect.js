/**
 * mainRedirect
 * description
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        return res.redirect('/prod/actual');
    };
};