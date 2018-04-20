// server.js

var sslRedirect = require('heroku-ssl-redirect');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var request = require('request');
var cors = require('cors');

app = express();
app.use(serveStatic(__dirname + "/.vuepress/dist"));

app.use(cors());

// enable ssl redirect
app.use(sslRedirect(['other','development', 'staging', 'production']));

app.get('/forward', function(req, res) {

  if(typeof req.query.method != "undefined") {

    // We should whitelist the query parameters here

    // Hardcode the wallet_send amount to be 0.01 always
    if(req.query.method == "wallet_send") {
      req.query.amount = 0.01;
    }

    request({
      url: "http://daemon.lbry.tech",
      qs: req.query
    }, function(error, response, body) {
      // Should we parse the body before forwarding?
      res.setHeader('Content-Type', 'application/json');
      res.send(body);
    })

  }

});

var port = process.env.PORT || 8080;
app.listen(port);

console.log('server started '+ port);
