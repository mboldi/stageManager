/**
 * moveShow
 * description
 */
const requireOption = require('../common').requireOption;

module.exports = function (objectrepository, direction) {

    return function (req, res, next) {
        if (direction === 'up') {
            if (res.local.show.num === 1) {
                return next();
            } else {
                res.local.show.num--;
                res.local.shows[res.local.show.num - 1].num++;

                res.local.show.save(function (err) {
                    res.local.shows[res.local.show.num - 1].save(function (err) {
                        return next();
                    });
                });
            }
        } else {
            if (res.local.show.num === res.local.shows.length) {
                return next();
            } else {
                res.local.show.num++;
                res.local.shows[res.local.show.num - 1].num--;

                res.local.show.save(function (err) {
                    res.local.shows[res.local.show.num - 1].save(function (err) {
                        return next();
                    });
                });
            }
        }
    };
};