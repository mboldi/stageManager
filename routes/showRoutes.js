const renderMW = require('../middleware/render');
const authMW = require('../middleware/auth/auth');

const getActualShow = require('../middleware/show/getCurrentShow');
const editShowMW = require('../middleware/show/editShow');
const deleteShowMW = require('../middleware/show/deleteShow');
const getShowMW = require('../middleware/show/getShow');
const getShowListMW = require('../middleware/show/getShowList');
const moveShowMW = require('../middleware/show/moveShow');
const fixNumberingMW = require('../middleware/show/fixNumbering');

const getCurrentNumMW = require('../middleware/ws/getCurrentNum');
const sendRefreshMW = require('../middleware/ws/sendRefresh');

const showModel = require('../models/show');

module.exports = function (app) {

    const objectRepository = {
        showModel: showModel
    };

    app.get('/prod/actual',
        authMW(objectRepository),
        getCurrentNumMW(objectRepository),
        getActualShow(objectRepository),
        renderMW(objectRepository, 'actualProd')
    );

    app.use('/prod/new',
        authMW(objectRepository),
        getShowListMW(objectRepository),
        editShowMW(objectRepository),
        fixNumberingMW(objectRepository),
        sendRefreshMW(objectRepository),
        function(req, res, next) {
            if(res.local.redir)
                res.redirect('/plan');
            else
                next();
        },
        renderMW(objectRepository, 'editShow')
    );

    app.get('/prod/:id/delete',
        authMW(objectRepository),
        getShowListMW(objectRepository),
        deleteShowMW(objectRepository),
        fixNumberingMW(objectRepository),
        sendRefreshMW(objectRepository),
        function (req, res) {
            return res.redirect('/plan');
        }
    );

    app.use('/prod/:id/edit',
        authMW(objectRepository),
        getShowMW(objectRepository),
        getShowListMW(objectRepository),
        editShowMW(objectRepository),
        fixNumberingMW(objectRepository),
        sendRefreshMW(objectRepository),
        function(req, res, next) {
            if(res.local.redir)
                res.redirect('/plan');
            else
                next();
        },
        renderMW(objectRepository, 'editShow')
    );

    app.get('/prod/:id/up',
        authMW(objectRepository),
        getShowMW(objectRepository),
        getShowListMW(objectRepository),
        moveShowMW(objectRepository, 'up'),
        sendRefreshMW(objectRepository),
        function (req, res) {
            return res.redirect('/plan');
        }
    );

    app.get('/prod/:id/down',
        authMW(objectRepository),
        getShowMW(objectRepository),
        getShowListMW(objectRepository),
        moveShowMW(objectRepository, 'down'),
        sendRefreshMW(objectRepository),
        function (req, res) {
            return res.redirect('/plan');
        }
    );

    app.get('/plan',
        authMW(objectRepository),
        getShowListMW(objectRepository),
        renderMW(objectRepository, 'programPlan')
    );

};