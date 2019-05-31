/**
 * getCurrentNum
 * description
 */
const WebSocket = require('ws');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof res.local === "undefined")
            res.local = {};

        const ws = new WebSocket('ws://localhost:5000');

        ws.on('open', function () {
            ws.send('prodNum');
        });

        ws.on('message', function (data) {
            //console.log('alma: ' + data);
            res.local.currNum = data;
            ws.terminate();
            return next();
        });
    };
};