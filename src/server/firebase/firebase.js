import admin from 'firebase-admin';

import serviceAccount from './salgum1114-5b040-firebase-adminsdk-86k0z-1ed5ca0c9a.json';

const initializeFirebase = () => {
    //initialize firebase
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://salgum1114-5b040.firebaseio.com',
    });
};

module.exports = initializeFirebase;

