/**
 * deleteShow
 * description
 */
const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {
    const showModel = requireOption(objectrepository, 'showModel');

    return function (req, res, next) {
        showModel.findOne(
            {_id: req.params.id},
            function (err, result) {
                result.remove(function (err) {
                    if (res.local.shows.length !== 1 && result.num < res.local.shows.length) {
                        for (let i = result.num; i < res.local.shows.length; i++) {
                            res.local.shows[i].num--;

                            res.local.shows[i].save(function (err) {
                                if (i === res.local.shows.length - 1) {
                                    return next();
                                }
                            });
                        }
                    } else {
                        return next();
                    }
                });
            });

    };
};