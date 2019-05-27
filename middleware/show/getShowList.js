/**
 * getShowList
 * description
 */
const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const showModel = requireOption(objectrepository, 'showModel');

    return function (req, res, next) {
        if(typeof res.local === "undefined")
            res.local = {};

        showModel.find({},
            function (err, result) {
                res.local.shows = result.sort((a, b) => (a.num > b.num) ? 1 : -1);

                return next();
            });
    };
};