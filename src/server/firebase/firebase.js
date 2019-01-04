const admin = require('firebase-admin');

const serviceAccount = require('./salgum1114-5b040-firebase-adminsdk-86k0z-1ed5ca0c9a.json');

const firbase = () => {
    //initialize firebase
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://salgum1114-5b040.firebaseio.com',
    });
};

module.exports = firbase;

