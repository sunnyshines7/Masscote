
// compatible API routes.
const Express = require('express');
const ParseServer = require('parse-server').ParseServer;

const ParseDashboard = require('parse-dashboard');

const port = 8500;
const server_url = 'http://localhost:'+port+'/parse'

var Server = new ParseServer({
    "databaseURI": 'mongodb://masscote:masscote123@localhost:27017/masscote',
    "cloud": __dirname + '/cloud/main.js',
    "appId": 'ATYIHGGRDOM672RLMWKH6FB01UU3LSXNUBCDF8LQ',
    "masterKey": 'P5Z7Q66LTQ98O1SDTPCGC8LSO0OAET9B9EL61645',
    "restAPIKey": "EXK7FD21HEVRFRRZCXHPDFY536CGAIF5GP4Z5VGQ",
    "javascriptKey": 'J88UQBTJ07QLYKXSMDKBBZ5L79VTNH1X02LYSTV6',
    "appName": 'Masscote',
    "verifyUserEmails": false,
    "serverURL": server_url,
    "publicServerURL": server_url
});

 var App = Express();
 App.use(Express.static('public'));


var trustProxy = true;
var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": server_url,
            "appId": 'ATYIHGGRDOM672RLMWKH6FB01UU3LSXNUBCDF8LQ',
            "masterKey": 'P5Z7Q66LTQ98O1SDTPCGC8LSO0OAET9B9EL61645',
			"restAPIKey": "EXK7FD21HEVRFRRZCXHPDFY536CGAIF5GP4Z5VGQ",
            "javascriptKey": 'J88UQBTJ07QLYKXSMDKBBZ5L79VTNH1X02LYSTV6',
            "appName": "Masscote"
        }
    ],
    "users": [
        {
            "user":"masscote",
            "pass":"masscote123#"
        }
    ],
    "useEncryptedPasswords": false,
    "trustProxy": 1
}, true);




// Serve the Parse API on the /parse URL prefix
var MountPath = '/parse';
App.use(MountPath, Server);

// Serve the Parse Dashboard on the /dasboard URL prefix
var MountPath = '/dashboard';
App.use(MountPath, dashboard);

// Parse Server plays nicely with the rest of your web routes
App.get('/', function (req, res) {
    res.status(200).send('Masscote Web Api.');
});


var httpServer = require('http').createServer(App);
httpServer.listen(port, function() {
    console.log('Server is running on '+ port);
});



