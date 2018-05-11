var octokit = require('@octokit/rest')();

octokit.activity.getEventsForOrg({
  org: 'lbryio',
  per_page: 20,
  page: 1
}).then(function({data}) {

  console.log(data);

});