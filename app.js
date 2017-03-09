var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var globalNotifications = [];
var notificationsPerOrganization = [];

var getNotifsForOrganization = function(organizationId) {
    var notifs = notificationsPerOrganization[organizationId];
    if (notifs === undefined) {
        notifs = new Array();
    }
    return notifs;
};

app.get('/', function(req, res) {
    res.send('notifwebhook is running.');
});

app.get('/notifications', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(globalNotifications));
});

app.get('/notifications/:organizationid', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(getNotifsForOrganization(req.params.organizationid)));
});

app.post('/notifications', function(req, res) {
    console.log("Received a notification.");

    if (req.body.organizationId !== undefined) {
        var notifs = getNotifsForOrganization(req.body.organizationId);

        notifs.push(req.body);
        notificationsPerOrganization[req.body.organizationId] = notifs;
    } else {
        globalNotifications.push(req.body);
    }

    res.sendStatus(200);
});

app.delete('/notifications', function(req, res) {
    console.log("Clearing notifications.");

    globalNotifications = [];
    notificationsPerOrganization = [];

    res.sendStatus(200);
});

app.listen(port, function() {
    console.log('Server listening.')
});