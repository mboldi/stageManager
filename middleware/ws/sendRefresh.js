/**
 * sendRefresh
 * description
 */
const WebSocket = require('ws');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof res.local.redir !== "undefined" && res.local.redir === false) {
            return next();
        } else {
            const ws = new WebSocket('ws://localhost:5000');

            ws.on('open', function () {
                ws.send('refresh');
                ws.terminate();
                return next();
            });
        }
    };
};