const mongoose = require('mongoose');

module.exports = {
    init: () => {
        // use Node.js with native Promise
        mongoose.Promise = global.Promise;
    
        // CONNECT TO MONGODB SERVER
        mongoose.connect('mongodb://localhost/blog')
            .then(() => console.log('Successfully connected to mongodb'))
            .catch(e => console.error(e));
    },
};