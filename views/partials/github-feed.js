"use strict"; require("dotenv").config();



//  P A C K A G E S

const dedent = require("dedent");
const html = require("choo-async/html");
const local = require("app-root-path").require;
const octokit = require("@octokit/rest")();
const redis = require("redis");

//  V A R I A B L E S

if (typeof process.env.GITHUB_OAUTH_TOKEN !== "undefined") {
  octokit.authenticate({
    type: "oauth",
    token: process.env.GITHUB_OAUTH_TOKEN
  });
}

// const logSlackError = local("/helpers/slack");
let client;

// process.env.NODE_ENV === "development" ? "" : redisClient = redis.createClient(process.env.REDISCLOUD_URL);
client = redis.createClient(process.env.REDISCLOUD_URL);

client.on("error", err => { // eslint-disable-line
  // console.log("Error", err); // logSlackError
});



//  P R O G R A M

client.zrevrange("events", 0, 9, (err, reply) => {
  if (err) return;

  const events = [];
  const renderedEvents = [];

  reply.forEach(item => events.push(JSON.parse(item)));

  for (const event of events) {
    // console.log(event.type);

    renderedEvents.push(`
      <div class='github-feed__event'>
        <a href="${generateGitHubUrl("actor", event)}" target="_blank" rel="noopener noreferrer">
          <img src="${event.actor.avatar_url}" class="github-feed__event__avatar" alt=""/>
        </a>

        <p>
          ${generateGitHubEvent(event)}
          <a href="${generateGitHubUrl("repo", event)}" title="View this repo on GitHub" target="_blank" rel="noopener noreferrer"><strong>${event.repo.name}</strong></a>
          <em class="github-feed__event__time">{{ event.created_at | moment('from') }}</em>
        </p>
      </div>
    `);
  }

  resultIsAvailable(dedent`
    <div id="github-feed" class="github-feed">
      <h3>GitHub</h3>
      <h5 class="last-updated" v-on:click="updateFeed">Last updated: {{ formatDate(lastUpdated) }}</h5>

      ${renderedEvents.join("")}
    </div>
  `);
});

const gitHubFeed = function (err, stuff) {
  return err;
};



function generateGitHubEvent(event) {
  switch (event) {
    case event.type === "CommitCommentEvent":
      return `
        <strong>${event.actor.display_login}</strong> commented on
        <a href="${generateGitHubUrl("comment", event)}" title="View this comment on GitHub">commit</a> in
      `;

    case event.type === "CreateEvent":
      return `
        <strong>${event.actor.display_login}</strong> created
        ${event.payload.ref_type} <code>${event.payload.ref}</code> in
      `;

    case event.type === "DeleteEvent":
      return `
        <strong>${event.actor.display_login}</strong> deleted
        ${event.payload.ref_type} <code>${event.payload.ref}</code> in
      `;

    case event.type === "ForkEvent":
      return `
        <strong>${event.actor.display_login}</strong> forked
        <strong><a href="${generateGitHubUrl("repo", event)}" title="View this repo on GitHub" target="_blank" rel="noopener noreferrer">${event.repo.name}</a></strong> to
        <strong><a href="${generateGitHubUrl("forkee", event)}" title="View this repo fork on GitHub" target="_blank" rel="noopener noreferrer">${event.payload.forkee.name}</a></strong> in
      `;

    case event.type === "IssueCommentEvent":
      if (event.payload.issue.pull_request) {
        return `
          <strong>${event.actor.display_login}</strong> commented on pull request
          <em><a href="${generateGitHubUrl("issue", event)}" title="View this comment on GitHub" target="_blank" rel="noopener noreferrer">${event.payload.issue.title}</a></em> in
        `;
      } else {
        return `
          <strong>${event.actor.display_login}</strong> commented on issue
          <em><a href="${generateGitHubUrl("issue", event)}" title="View this comment on GitHub" target="_blank" rel="noopener noreferrer">${event.payload.issue.title}</a></em> in
        `;
      }

    case event.type === "IssuesEvent":
      return `
        <strong>${event.actor.display_login}</strong> ${event.payload.action} issue
        <em><a href="${generateGitHubUrl("issue", event)}" title="View this issue on GitHub" target="_blank" rel="noopener noreferrer">${event.payload.issue.title}</a></em> in
      `;

    case event.type === "PullRequestEvent":
      return `
        <strong>${event.actor.display_login}</strong> ${event.payload.action} pull request
        <em><a href="${generateGitHubUrl("pull_request", event)}" title="View this pull request on GitHub" target="_blank" rel="noopener noreferrer">${event.payload.pull_request.title}</a></em> in
      `;

    case event.type === "PullRequestReviewCommentEvent":
      return `
        <strong>${event.actor.display_login}</strong> commented on pull request
        <em><a href="${generateGitHubUrl("pull_request", event)}" title="View this comment on GitHub" target="_blank" rel="noopener noreferrer">${event.payload.pull_request.title}</a></em> in
      `;

    case event.type === "PushEvent":
      return `
        <strong>${event.actor.display_login}</strong> pushed to
        <code><a href="${generateGitHubUrl("push", event)}" title="View this branch on GitHub" target="_blank" rel="noopener noreferrer">${refToBranch(event.payload.ref)}</a></code> in
      `;

    case event.type === "ReleaseEvent":
      return `
        <strong>${event.actor.display_login}</strong> released
        <em><a href="${generateGitHubUrl("release", event)}" title="View this release on GitHub" target="_blank" rel="noopener noreferrer">${event.payload.release.tag_name}</a></em> in
      `;

    case event.type === "WatchEvent":
      return `
        <strong>${event.actor.display_login}</strong> starred the repo
      `;

    default:
      break;
  }
}

function generateGitHubUrl(type, event) {
  switch (type) {
    case "actor":
      return `https://github.com/${event.actor.display_login}`;

    case "comment":
      return event.payload.comment.html_url;

    case "repo":
      return `https://github.com/${event.repo.name}`;

    case "forkee":
      return `https://github.com/${event.payload.forkee.full_name}`;

    case "issue":
      return event.payload.issue.html_url;

    case "pull_request":
      return event.payload.pull_request.html_url;

    case "release":
      return event.payload.release.html_url;

    case "push":
      return `https://github.com/${event.repo.name}/tree/${event.payload.ref.replace("refs/heads/", "")}`;

    default:
      break;
  }
}

function refToBranch(ref) {
  return ref.replace("refs/heads/", "");
}



//  E X P O R T

module.exports = exports = gitHubFeed;
