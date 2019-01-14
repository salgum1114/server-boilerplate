import webpush from 'web-push';
import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import { parse } from 'url';
import { resolve } from 'path';

import Routes from '../routes';
import initializeFirebase from './firebase/firebase';
import database from './database/database';
import controllers from './controllers';

const port = parseInt(process.env.PORT, 10) || 80;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './src/client', dev });

const handler = Routes.getRequestHandler(app);

app.prepare().then(() => {
    database.init();
    initializeFirebase();

    const server = express();
    const vapidKeys = webpush.generateVAPIDKeys();
 
    webpush.setGCMAPIKey('<Firebase Server API Key>');
    webpush.setVapidDetails(
        'mailto:salgum1112@gmail.com',
        vapidKeys.publicKey,
        vapidKeys.privateKey,
    );

    // Body parser use
    server.use(bodyParser.urlencoded({extended: true}));
    server.use(bodyParser.json());

    // API contoller use
    server.use(controllers);

    // Service worker push message
    server.get('/vapidPublicKey', function(req, res) {
        res.send(vapidKeys.publicKey);
    });

    server.post('/register', function(req, res) {
        // A real world application would store the subscription info.
        res.sendStatus(201);
    });

    server.post('/sendNotification', function(req, res) {
        const subscription = req.body.subscription;
        const params = {
            title: 'sgoh test',
            message: 'sgoh test',
            tag: 'sgoh test',
        };
        const payload = new Buffer(JSON.stringify(params), 'utf8');
        const options = {
            TTL: 6000,
        };
        setTimeout(function() {
            webpush.sendNotification(subscription, payload, options).then(function() {
                res.sendStatus(201);
            }).catch(function(error) {
                res.sendStatus(500);
                console.log(error);
            });
        }, 1000);
    });

    // Resources handler
    server.get('/manifest.json', (req, res) => {
        res.sendFile(resolve(`./static/manifest.json`));
    });

    server.get('/favicon.ico', (req, res) => {
        res.sendFile(resolve(`./static/favicon.ico`));
    });

    server.get('/loader.css', (req, res) => {
        res.sendFile(resolve(`./static/loader.css`));
    });

    server.get('/service-worker.js', (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname, query = {} } = parsedUrl;
        const filePath = resolve(`./src/client/.next/${pathname}`);
        res.sendFile(filePath);
    });

    // Listen server
    server.use(handler).listen(port, function (err) {
        if (err) throw err;
        console.log(`App Listening on port ${port}`);
    });
});
