// server.js

// env variables
require('dotenv').config();
// Async
var async = require("async");
// Express etc
var sslRedirect = require('heroku-ssl-redirect');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var request = require('request');
var cors = require('cors');
// Cron
var CronJob = require('cron').CronJob;
// Github API
var octokit = require('@octokit/rest')();
// Redis
var redis = require("redis"),
redisClient = redis.createClient(process.env.REDISCLOUD_URL);

app = express();
app.use(serveStatic(__dirname + "/.vuepress/dist"));

app.use(cors());

// enable ssl redirect
app.use(sslRedirect(['other','development', 'staging', 'production']));

app.get('/forward', function(req, res) {

  var allowedMethods = ["wallet_send", "resolve", "publish"];

  if(typeof req.query.method != "undefined") {

    if(allowedMethods.includes(req.query.method)) {

      // We should whitelist the query parameters here

      if(req.query.method == "wallet_send") {

        // Hardcode the wallet_send amount to be always 0.01 always
        req.query.amount = 0.01;

        // Whitelist claim ids
        var allowedClaims = ["fbdcd44a97810522d23d5f1335b8ca04be9d776c", "de7f7fa33e8d879b2bae7238d2bdf827a39f9301", "5b7c7a202201033d99e1be2930d290c127c0f4fe", "a1372cf5523885f5923237bfe522f02f5f054362"];

        if(!allowedClaims.includes(req.query.claim_id)) {
          res.json({});
        }

      }

      request({
        url: "http://daemon.lbry.tech",
        qs: req.query
      }, function(error, response, body) {
        // Should we parse the body before forwarding?
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
      });

    }

  }

});

app.get('/github-feed', function(req, res) {

  redisClient.zrevrange('events', 0, 9, function(err, reply) {

    var events = [];

    reply.forEach(function(item) {
      events.push(JSON.parse(item));
    });
    
    res.json(events);

  });

});

var port = process.env.PORT || 8080;
app.listen(port);

console.log('server started '+ port);

function updateGithubFeed() {

  octokit.activity.getEventsForOrg({
    org: 'lbryio',
    per_page: 20,
    page: 1
  }).then(function({data}) {

    async.eachSeries(data, function(item, callback) {

      var eventString = JSON.stringify(item);

      redisClient.zrank('events', eventString, function(err, reply) {
        
        if(reply == null) {

          redisClient.zadd('events', item.id, eventString, callback);

        } else {

          callback();

        }

      });

    }, function() {

      // Keep the latest 50 events
      redisClient.zremrangebyrank('events', 0, -51);

      console.log('Updated Github feed');

    });

  });

}

// Update Github feed every minute
new CronJob("0 * * * * *", updateGithubFeed, null, true, 'America/Los_Angeles');