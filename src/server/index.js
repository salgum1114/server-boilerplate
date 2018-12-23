const webpush = require('web-push');
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const { parse } = require('url');
const { resolve, join } = require('path');

const getRoutes = require('./routes');
const database = require('./database/database');

const port = parseInt(process.env.PORT, 10) || 80;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './src/client', dev });

const handle = app.getRequestHandler();
const routes = getRoutes();

const apiPrefix = '/api';

app.prepare().then(() => {
    database.init();

    const server = express();
    const vapidKeys = webpush.generateVAPIDKeys();
 
    webpush.setGCMAPIKey('<Firebase Server API Key>');
    webpush.setVapidDetails(
        'mailto:salgum1112@gmail.com',
        vapidKeys.publicKey,
        vapidKeys.privateKey,
    );

    server.use(bodyParser.urlencoded({extended: true}));
    server.use(bodyParser.json());

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

    server.use(`${apiPrefix}/posts`, require('./controllers/posts'));

    server.get('/manifest.json', (req, res) => {
        res.sendFile(resolve(`./static/manifest.json`));
    });

    server.get('/favicon.ico', (req, res) => {
        res.sendFile(resolve(`./static/favicon.ico`));
    });

    server.get('/service-worker.js', (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname, query = {} } = parsedUrl;
        const filePath = resolve(`./src/client/.next/${pathname}`);
        res.sendFile(filePath);
    });

    server.get('*', (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname, query = {} } = parsedUrl;
        const route = routes[pathname];
        if (route) {
            return app.render(req, res, route.page, query);
        }
        return handle(req, res);
    });
    

    server.listen(port, function (err) {
        if (err) throw err;
        console.log(`App Listening on port ${port}`);
    });
});
