/**
 * getShow
 * description
 */
const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const showModel = requireOption(objectrepository, 'showModel');

    return function (req, res, next) {
        if (typeof res.local === "undefined")
            res.local = {};

        showModel.findOne(
            {_id: req.params.id},
            function (err, result) {
                res.local.show = result;
                return next();
            });

    };
};