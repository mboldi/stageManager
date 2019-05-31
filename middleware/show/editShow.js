/**
 * addShow
 * description
 */
const multer = require('multer');

const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const showModel = requireOption(objectrepository, 'showModel');

    return function (req, res, next) {
        const fileName = 'pic' + '-' + Date.now() + '.jpg';

        if (typeof res.local === "undefined")
            res.local = {};

        res.local.redir = false;

        if (typeof req.params.id === "undefined")
            res.local.title = "hozzáadása";
        else
            res.local.title = "szerkesztése";

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'static/img');
            },
            filename: function (req, file, cb) {
                cb(null, fileName);
            }
        });

        const upload = multer({storage: storage}).single('picture');

        upload(req, res, function (err) {
            if (err)
                console.log(err);
            else
                console.log('file uploaded');

            if (typeof req.body.name !== "undefined") {
                let show;

                if (typeof req.params.id === "undefined") {
                    show = new showModel();
                } else {
                    show = res.local.show;
                }

                show.name = req.body.name;
                show.performer = req.body.performer;

                if (req.body.mic !== '')
                    show.needed.mic = req.body.mic;

                if (req.body.music !== '')
                    show.needed.music = req.body.music;

                if (req.body.curtain !== '')
                    show.needed.curtain = req.body.curtain;

                if (req.body.light !== '')
                    show.needed.light = req.body.light;

                if (req.body.other !== '')
                    show.needed.other = req.body.other;


                if (typeof req.body.afterThis !== "undefined" && req.body.afterThis !== '') {
                    const after = res.local.shows.find(currShow => {
                        return currShow.name === req.body.afterThis.split(' - ')[1];
                    });

                    show.num = after.num + 1;

                    if (typeof req.file !== "undefined") {
                        console.log('got file');

                        show.img = fileName;
                    }

                    show.save(function (err) {
                        if (after.num < res.local.shows.length) {
                            for (let i = after.num; i < res.local.shows.length; i++) {
                                res.local.shows[i].num++;

                                res.local.shows[i].save(function (err) {
                                    if (i === res.local.shows.length - 1) {
                                        res.local.redir = true;
                                        return next();
                                    }
                                });
                            }
                        } else {
                            res.local.redir = true;
                            return next();
                        }
                    });
                } else {
                    show.num = 1;

                    if (typeof req.file !== "undefined") {
                        console.log('got file');

                        show.img = fileName;
                    }

                    show.save(function (err) {
                        res.local.redir = true;
                        return next();
                    });
                }
            } else {
                res.local.redir = false;
                return next();
            }
        });
    };
};