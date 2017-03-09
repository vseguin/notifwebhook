var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
    res.send('Hello World!')
});

app.post('/notifications', function(req, res) {
    console.log("Received something");
    res.sendStatus(200);
});

app.listen(port, function() {
    console.log('Server listening.')
});