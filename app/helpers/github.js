"use strict";



//  P A C K A G E S

const async = require("async");
const color = require("colorette");
const local = require("app-root-path").require;
const octokit = require("@octokit/rest")();
const redis = require("redis");

//  U T I L S

const messageSlack = local("/app/helpers/slack");
const relativeDate = local("/app/modules/relative-date");

String.prototype.escape = function() {
  const tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;"
  };

  return this.replace(/[&<>]/g, tag => tagsToReplace[tag] || tag);
};

//  R E D I S

let client;

if (typeof process.env.GITHUB_OAUTH_TOKEN !== "undefined") {
  // new octokit({
  //   auth: `token ${process.env.GITHUB_OAUTH_TOKEN}`
  // });
  // https://github.com/octokit/rest.js/issues/1207

  octokit.authenticate({
    type: "oauth",
    token: process.env.GITHUB_OAUTH_TOKEN
  });
} else process.stdout.write(`${color.red("[missing]")} GitHub token`);

if (typeof process.env.REDISCLOUD_URL !== "undefined") {
  client = redis.createClient(process.env.REDISCLOUD_URL);

  client.on("error", redisError => {
    process.env.NODE_ENV === "development" ?
      process.stdout.write(`\n${color.yellow("Unable to connect to Redis client.")}\nYou may be missing an .env file or your connection was reset.`) :
      messageSlack(
        "\n" +
        "> *REDIS ERROR:* ```" + JSON.parse(JSON.stringify(redisError)) + "```" + "\n" +
        "> _Cause: Someone is trying to run LBRY.tech locally without environment variables OR Heroku is busted_\n"
      )
    ;
  });
} else process.stdout.write(`${color.red("[missing]")} Redis client URL`);



//  P R O G R A M

function generateEvent(event) {
  switch(event.type) {
    case "CommitCommentEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> commented on

        <a
          href="${generateUrl("comment", event)}"
          target="_blank"
          title="View this comment on GitHub"
          rel="noopener noreferrer"
        >commit</a> in
      `;

    case "CreateEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> created ${event.payload.ref_type}

        <code><a
          href="${generateUrl("create", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this branch on GitHub"
        >${refToBranch(event.payload.ref)}</a></code> in
      `;

    case "DeleteEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> deleted

        ${event.payload.ref_type} <code>${event.payload.ref}</code> in
      `;

    case "ForkEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> forked

        <strong><a
          href="${generateUrl("repo", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this repo on GitHub"
        >${event.repo.name}</a></strong> to

        <strong><a
          href="${generateUrl("forkee", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this repo fork on GitHub"
        >${event.payload.forkee.full_name}</a></strong>
      `;

    case "IssueCommentEvent":
      if (event.payload.issue.pull_request) {
        return `
          <strong><a
            href="${generateUrl("actor", event)}"
            rel="noopener noreferrer"
            target="_blank"
            title="Visit ${event.actor.login}'s profile on GitHub"
          >${event.actor.display_login}</a></strong> commented on pull request

          <em><a
            href="${generateUrl("issue", event)}"
            rel="noopener noreferrer"
            target="_blank"
            title="View this comment on GitHub"
          >${event.payload.issue.title.escape()}</a></em> in
        `;
      } else {
        return `
          <strong>${event.actor.display_login}</strong> commented on issue

          <em><a
            href="${generateUrl("issue", event)}"
            rel="noopener noreferrer"
            target="_blank"
            title="View this comment on GitHub"
          >${event.payload.issue.title.escape()}</a></em> in
        `;
      }

    case "IssuesEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> ${event.payload.action} issue

        <em><a
          href="${generateUrl("issue", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this issue on GitHub"
        >${event.payload.issue.title.escape()}</a></em> in
      `;

    case "PullRequestEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> pull request

        <em><a
          href="${generateUrl("pull_request", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this pull request on GitHub"
        >${event.payload.pull_request.title.escape()}</a></em> in
      `;

    case "PullRequestReviewCommentEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> commented on pull request

        <em><a
          href="${generateUrl("pull_request", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this comment on GitHub"
        >${event.payload.pull_request.title.escape()}</a></em> in
      `;

    case "PushEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> pushed to

        <code><a
          href="${generateUrl("push", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this branch on GitHub"
        >${refToBranch(event.payload.ref)}</a></code> in
      `;

    case "ReleaseEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> released

        <em><a
          href="${generateUrl("release", event)}"
          title="View this release on GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >${event.payload.release.tag_name}</a></em> in
      `;

    case "WatchEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> starred the repo
      `;

    default:
      break;
  }
}

function generateGitHubFeed(displayGitHubFeed) {
  if (typeof process.env.REDISCLOUD_URL !== "undefined") {
    client.zrevrange("events", 0, 9, (err, reply) => {
      if (err) return; // TODO: Render a div with nice error message

      const events = [];
      const renderedEvents = [];

      reply.forEach(item => events.push(JSON.parse(item)));

      for (const event of events) {
        const repoName = `
          <a href="${generateUrl("repo", event)}" title="View this repo on GitHub" target="_blank" rel="noopener noreferrer"><strong>${event.repo.name}</strong></a>
        `;

        renderedEvents.push(`
          <div class='github-feed__event'>
            <a href="${generateUrl("actor", event)}" target="_blank" rel="noopener noreferrer">
              <img src="${event.actor.avatar_url}" class="github-feed__event__avatar" alt="${event.actor.login}'s avatar"/>
            </a>

            <p>
              ${generateEvent(event)}
              ${event.type !== "ForkEvent" ? repoName : ""}
              <em class="github-feed__event__time">${relativeDate(new Date(event.created_at))}</em>
            </p>
          </div>
        `);
      }

      updateGithubFeed(); // TODO: Update `.last-updated` every minute

      displayGitHubFeed(`
        <h3>GitHub</h3>
        <h5 class="last-updated">Last updated: ${new Date().format("YYYY-MM-DD")
    .replace(/-/g, "&middot;")} at ${new Date().add(-4, "hours")
  .format("UTC:H:mm:ss A")
  .toLowerCase()} EST</h5>

        ${renderedEvents.join("")}
      `);
    });
  }
}

function generateUrl(type, event) {
  switch(type) {
    case "actor":
      return `https://github.com/${event.actor.display_login}`;

    case "comment":
      return event.payload.comment.html_url;

    case "create":
      return `https://github.com/${event.repo.name}/tree/${event.payload.ref}`;

    case "forkee":
      return `https://github.com/${event.payload.forkee.full_name}`;

    case "issue":
      return event.payload.issue.html_url;

    case "pull_request":
      return event.payload.pull_request.html_url;

    case "push":
      return `https://github.com/${event.repo.name}/tree/${event.payload.ref.replace("refs/heads/", "")}`;

    case "release":
      return event.payload.release.html_url;

    case "repo":
      return `https://github.com/${event.repo.name}`;

    default:
      break;
  }
}

function updateGithubFeed() {
  octokit.activity.listPublicEventsForOrg({
    org: "lbryio",
    per_page: 20,
    page: 1
  }).then(({ data }) => {
    async.eachSeries(data, (item, callback) => {
      const eventString = JSON.stringify(item);

      client.zrank("events", eventString, (err, reply) => {
        if (reply === null) client.zadd("events", item.id, eventString, callback);
        else callback();
      });
    }, () => client.zremrangebyrank("events", 0, -51)); // Keep the latest 50 events
  })
    .catch(err => {
      messageSlack(
        "\n" +
        "> *GITHUB FEED ERROR:* ```" + JSON.parse(JSON.stringify(err)) + "```" + "\n" +
        "> _Cause: GitHub feed refresh_\n"
      );
    });
}



//  H E L P E R

function refToBranch(ref) {
  if (ref) return ref.replace("refs/heads/", "");
}



//  E X P O R T S

export {
  generateEvent,
  generateGitHubFeed,
  generateUrl,
  updateGithubFeed
};
