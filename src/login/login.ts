import * as express from 'express';

export function buildLoginRoute(app: express.Express) {

    app.get('/', function (request, response) {
        response.sendFile('login.html', { root: __dirname });
    });

    app.post('/auth', function (request, response) {
        var username = request.body.username;
        var password = request.body.password;
        if (username && password) {
            // let userInfoService = Container.get(UserInfoService);
            // TODO: kevin zhang Do some login logic here to get auth infomation and 
            // store to Context or cookie or some where, then we can use this info in
            // global middleware to do following request call.
        } else {
            response.send('Please enter Username and Password!');
            response.end();
        }
    });
}