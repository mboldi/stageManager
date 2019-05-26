const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stageManager');

module.exports = mongoose;