const renderMW = require('../middleware/render');
const authMW = require('../middleware/auth/auth');
const loginMW = require('../middleware/auth/login');
const logoutMW = require('../middleware/auth/logout');
const mainRedirectMW = require('../middleware/mainRedirect');

const showModel = require('../models/show');

module.exports = function (app) {
    const objectRepository = {
        showModel: showModel
    };

    app.use('/login',
       loginMW(objectRepository),
       renderMW(objectRepository, 'login')
    );

    app.use('/logout',
        authMW(objectRepository),
        logoutMW(objectRepository),
        function (req, res) {
            return res.redirect('/login');
        }
    );

    app.get('/',
        mainRedirectMW(objectRepository)
    );

};