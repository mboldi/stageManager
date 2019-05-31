const express = require('express');
const app = new express();
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(express.static('static'));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'kakaoscsiga',
    cookie: {
        maxAge: 6000000
    },
    resave: true,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

require('./routes/generic')(app);
require('./routes/showRoutes')(app);

const port = 3000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});


//websocket server
const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 5000});

let actProd = 1;

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('got: ' + message);

        if (message === 'prodNum')
            ws.send(actProd);
        else if (message === 'inc')
            console.log(++actProd);
        else if (message === 'dec') {
            if (actProd > 1)
                console.log(--actProd);
        } else if (message === 'refresh')
            wss.clients.forEach(function (client) {
                client.send('refresh');
            });
    });
});
