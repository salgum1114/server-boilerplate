import admin from 'firebase-admin';

function firebaseAuthMiddleware(req, res, next) {
    const authorization = req.header('Authorization');
    if (authorization) {
        let token = authorization.split(' ');
        admin.auth().verifyIdToken(token[1])
        .then((decodedToken) => {
            res.locals.user = decodedToken;
            next();
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(401);
        });
    } else {
        console.log('Authorization header is not found');
        res.sendStatus(401);
    }
}

export default firebaseAuthMiddleware;
