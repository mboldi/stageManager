/**
 * fixNumbering
 * description
 */
const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {
    const showModel = requireOption(objectrepository, 'showModel');

    return function (req, res, next) {
        showModel.find(
            {},
            function (err, result) {
                if (result.length > 1) {
                    result = result.sort((a, b) => (a.num > b.num) ? 1 : -1);

                    for (let i = 0; i < result.length; i++) {
                        result[i].num = i + 1;

                        result[i].save(function (err) {
                            if (i === result.length - 1)
                                return next();
                        });
                    }
                } else {
                    return next();
                }
            }
        )
    };
};