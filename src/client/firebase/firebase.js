import firebase from 'firebase/app';
import 'firebase/auth';

import config from './config';

export const initializeFirebase = async () => {
    if (!firebase.apps.length) {
        
        //initialize firebase
        await firebase.initializeApp(config);
    }
};