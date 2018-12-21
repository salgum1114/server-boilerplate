const webpush = require('web-push');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const vapidKeys = webpush.generateVAPIDKeys();
 
webpush.setGCMAPIKey('<Firebase Server API Key>');
webpush.setVapidDetails(
    'mailto:salgum1112@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey,
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', express.static('./public'));

app.get('/vapidPublicKey', function(req, res) {
    res.send(vapidKeys.publicKey);
});

app.post('/register', function(req, res) {
    // A real world application would store the subscription info.
    res.sendStatus(201);
});

app.post('/sendNotification', function(req, res) {
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

app.get('*', (req, res) => {
    res.sendFile('./public/index.html');
});

app.listen(80, function () {
    console.log('App Listening on port 80');
});