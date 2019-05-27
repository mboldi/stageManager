const renderMW = require('../middleware/render');
const authMW = require('../middleware/auth/auth');

const getActualShow = require('../middleware/show/getActualShow');
const editShowMW = require('../middleware/show/editShow');
const deleteShowMW = require('../middleware/show/deleteShow');
const getShowMW = require('../middleware/show/getShow');
const getShowListMW = require('../middleware/show/getShowList');
const moveShowMW = require('../middleware/show/moveShow');

const showModel = require('../models/show');

module.exports = function (app) {

    const objectRepository = {
        showModel: showModel
    };

    app.get('/prod/actual',
        authMW(objectRepository),
        getActualShow(objectRepository),
        renderMW(objectRepository, 'actualProd')
    );

    app.use('/prod/new',
        authMW(objectRepository),
        getShowListMW(objectRepository),
        editShowMW(objectRepository),
        renderMW(objectRepository, 'editShow')
    );

    app.get('/prod/:id/delete',
        authMW(objectRepository),
        getShowListMW(objectRepository),
        deleteShowMW(objectRepository),
        function (req, res) {
            return res.redirect('/plan');
        }
    );

    app.use('/prod/:id/edit',
        authMW(objectRepository),
        getShowMW(objectRepository),
        getShowListMW(objectRepository),
        editShowMW(objectRepository),
        renderMW(objectRepository, 'editShow')
    );

    app.get('/prod/:id/up',
        authMW(objectRepository),
        moveShowMW(objectRepository, 'up'),
        function (req, res) {
            return res.redirect('/plan');
        }
    );

    app.get('/prod/:id/down',
        authMW(objectRepository),
        moveShowMW(objectRepository, 'down'),
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