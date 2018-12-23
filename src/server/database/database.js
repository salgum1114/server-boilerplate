const mongoose = require('mongoose');

module.exports = {
    init: () => {
        // Node.js의 native Promise 사용
        mongoose.Promise = global.Promise;
    
        // CONNECT TO MONGODB SERVER
        mongoose.connect('mongodb://localhost/blog')
            .then(() => console.log('Successfully connected to mongodb'))
            .catch(e => console.error(e));
    },
};