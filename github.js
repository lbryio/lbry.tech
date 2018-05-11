require('dotenv').config();

var octokit = require('@octokit/rest')();

var redis = require("redis"),
redisClient = redis.createClient(process.env.REDISCLOUD_URL);

octokit.activity.getEventsForOrg({
  org: 'lbryio',
  per_page: 20,
  page: 1
}).then(function({data}) {

  console.log(data);

  redisClient.set('events', JSON.stringify(data), redis.print);

});