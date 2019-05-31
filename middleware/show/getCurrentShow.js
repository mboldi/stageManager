/**
 * getActualProd
 * description
 */
const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const showModel = requireOption(objectrepository, "showModel");

    return function (req, res, next) {

        if (typeof res.local === "undefined")
            res.local = {};

         showModel.findOne(
             {num: res.local.currNum},
             function (err, result) {
                 res.local.show1 = result;

                 showModel.findOne(
                     {num: Number(res.local.currNum) + 1},
                     function (err, show2) {
                         res.local.show2 = show2;

                         return next();
                     }
                 )
             }
         );
    };
};