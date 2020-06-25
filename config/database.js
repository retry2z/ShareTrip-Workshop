const mongoose = require('mongoose');

module.exports = (config) => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    return mongoose.connect(config.dbURL);
};
