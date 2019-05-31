/**
 * sendRefresh
 * description
 */
const WebSocket = require('ws');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        const ws = new WebSocket('ws://localhost:5000');

        ws.on('open', function () {
            ws.send('refresh');
            ws.terminate();
            return next();
        });
    };
};