"use strict";



//  P R O G R A M

function generateEvent(event) {
  switch (event.type) {
    case "CommitCommentEvent":
      return `
        <strong>${event.actor.display_login}</strong> commented on
        <a href="${generateUrl("comment", event)}" title="View this comment on GitHub">commit</a> in
      `;

    case "CreateEvent":
      return `
        <strong>${event.actor.display_login}</strong> created
        ${event.payload.ref_type} <code>${event.payload.ref}</code> in
      `;

    case "DeleteEvent":
      return `
        <strong>${event.actor.display_login}</strong> deleted
        ${event.payload.ref_type} <code>${event.payload.ref}</code> in
      `;

    case "ForkEvent":
      return `
        <strong>${event.actor.display_login}</strong> forked
        <strong><a href="${generateUrl("repo", event)}" title="View this repo on GitHub" target="_blank" rel="noopener noreferrer">${event.repo.name}</a></strong> to
        <strong><a href="${generateUrl("forkee", event)}" title="View this repo fork on GitHub" target="_blank" rel="noopener noreferrer">${event.payload.forkee.name}</a></strong> in
      `;

    case "IssueCommentEvent":
      if (event.payload.issue.pull_request) {
        return `
          <strong>${event.actor.display_login}</strong> commented on pull request
          <em><a href="${generateUrl("issue", event)}" title="View this comment on GitHub" target="_blank" rel="noopener noreferrer">${event.payload.issue.title}</a></em> in
        `;
      } else {
        return `
          <strong>${event.actor.display_login}</strong> commented on issue
          <em><a href="${generateUrl("issue", event)}" title="View this comment on GitHub" target="_blank" rel="noopener noreferrer">${event.payload.issue.title}</a></em> in
        `;
      }

    case "IssuesEvent":
      return `
        <strong>${event.actor.display_login}</strong> ${event.payload.action} issue
        <em><a href="${generateUrl("issue", event)}" title="View this issue on GitHub" target="_blank" rel="noopener noreferrer">${event.payload.issue.title}</a></em> in
      `;

    case "PullRequestEvent":
      return `
        <strong>${event.actor.display_login}</strong> ${event.payload.action} pull request
        <em><a href="${generateUrl("pull_request", event)}" title="View this pull request on GitHub" target="_blank" rel="noopener noreferrer">${event.payload.pull_request.title}</a></em> in
      `;

    case "PullRequestReviewCommentEvent":
      return `
        <strong>${event.actor.display_login}</strong> commented on pull request
        <em><a href="${generateUrl("pull_request", event)}" title="View this comment on GitHub" target="_blank" rel="noopener noreferrer">${event.payload.pull_request.title}</a></em> in
      `;

    case "PushEvent":
      return `
        <strong>${event.actor.display_login}</strong> pushed to
        <code><a href="${generateUrl("push", event)}" title="View this branch on GitHub" target="_blank" rel="noopener noreferrer">${refToBranch(event.payload.ref)}</a></code> in
      `;

    case "ReleaseEvent":
      return `
        <strong>${event.actor.display_login}</strong> released
        <em><a href="${generateUrl("release", event)}" title="View this release on GitHub" target="_blank" rel="noopener noreferrer">${event.payload.release.tag_name}</a></em> in
      `;

    case "WatchEvent":
      return `
        <strong>${event.actor.display_login}</strong> starred the repo
      `;

    default:
      break;
  }
}

function generateUrl(type, event) {
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



//  H E L P E R

function refToBranch(ref) {
  return ref.replace("refs/heads/", "");
}



//  E X P O R T S

module.exports = exports = {
  generateEvent,
  generateUrl
};
