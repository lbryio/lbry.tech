<template>
  <div id="github-feed" class="github-feed">
    <h3>GitHub</h3>
    <h5 class="last-updated" v-on:click="updateFeed">Last updated: {{ formatDate(lastUpdated) }}</h5>

    <div v-for="event in events" class="github-feed__event">
      <a v-bind:href="generateGithubUrl('actor',event)" target="_blank">
        <img v-bind:src="event.actor.avatar_url" class="github-feed__event__avatar">
      </a>

      <p>
        <template v-if="event.type == 'CommitCommentEvent'">
          <strong>{{ event.actor.display_login }}</strong> commented on <a v-bind:href="generateGithubUrl('comment', event)">commit</a>
        </template>

        <template v-else-if="event.type == 'CreateEvent'">
          <strong>{{ event.actor.display_login }}</strong> created {{ event.payload.ref_type }} '{{ event.payload.ref }}'
        </template>

        <template v-else-if="event.type == 'DeleteEvent'">
          <strong>{{ event.actor.display_login }}</strong> deleted {{ event.payload.ref_type }} '{{ event.payload.ref }}'
        </template>

        <template v-else-if="event.type == 'ForkEvent'">
          <strong>{{ event.actor.display_login }}</strong> forked <a v-bind:href="generateGithubUrl('repo', event)" target="_blank">{{ event.repo.name }}</a> to <a v-bind:href="generateGithubUrl('forkee', event)" target="_blank">{{ event.payload.forkee.name }}</a>
        </template>

        <template v-else-if="event.type == 'IssueCommentEvent'">
          <strong>{{ event.actor.display_login }}</strong> commented on <template v-if="event.payload.issue.pull_request">pull request</template><template v-else>issue</template>&nbsp;<a v-bind:href="generateGithubUrl('issue', event)" target="_blank">{{ event.payload.issue.title }}</a>
        </template>

        <template v-else-if="event.type == 'IssuesEvent'">
          <strong>{{ event.actor.display_login }}</strong> {{ event.payload.action }} issue <a v-bind:href="generateGithubUrl('issue', event)" target="_blank">{{ event.payload.issue.title }}</a>
        </template>

        <template v-else-if="event.type == 'PullRequestEvent'">
          <strong>{{ event.actor.display_login }}</strong> {{ event.payload.action }} pull request <a v-bind:href="generateGithubUrl('pull_request', event)" target="_blank">{{ event.payload.pull_request.title }}</a>
        </template>

        <template v-else-if="event.type == 'PullRequestReviewCommentEvent'">
          <strong>{{ event.actor.display_login }}</strong> commented on pull request <a v-bind:href="generateGithubUrl('pull_request', event)" target="_blank">{{ event.payload.pull_request.title }}</a>
        </template>

        <template v-else-if="event.type == 'PushEvent'">
          <strong>{{ event.actor.display_login }}</strong> pushed to <a v-bind:href="generateGithubUrl('push', event)" target="_blank">{{ refToBranch(event.payload.ref) }}</a>
        </template>

        <template v-else-if="event.type == 'ReleaseEvent'">
          <strong>{{ event.actor.display_login }}</strong> released <a v-bind:href="generateGithubUrl('release', event)" target="_blank">{{ event.payload.release.tag_name }}</a>
        </template>

        <template v-else-if="event.type == 'WatchEvent'">
          <strong>{{ event.actor.display_login }}</strong> starred the repo
        </template>

        in <a v-bind:href="generateGithubUrl('repo', event)" target="_blank"><strong>{{ event.repo.name }}</strong></a>
        <em class="github-feed__event__time">{{ event.created_at | moment('from') }}</em>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      events: [],
      updateInterval: {},
      lastUpdated: new Date()
    }
  },
  name: 'GithubFeed',
  mounted () {

    this.updateFeed();

    this.updateInterval = setInterval(this.updateFeed, 60*1000);

  },
  methods: {
    updateFeed () {

      var component = this;

      component.$http.get('//beta.lbry.tech/github-feed').then(function(response) {
        component.events = response.body;
      });

      component.lastUpdated = new Date();

    },
    refToBranch (ref) {

      return ref.replace('refs/heads/','');

    },
    formatDate (date) {

      return date.toLocaleString('en-US');

    },
    generateGithubUrl (type, event) {

      switch(type) {
        case 'actor':
          return 'https://github.com/' + event.actor.display_login;
        break;
        case 'comment':
          return event.payload.comment.html_url;
        break;
        case 'repo':
          return 'https://github.com/' + event.repo.name;
        break;
        case 'forkee':
          return 'https://github.com/' + event.payload.forkee.full_name;
        break;
        case 'issue':
          return event.payload.issue.html_url;
        break;
        case 'pull_request':
          return event.payload.pull_request.html_url;
        break;
        case 'release':
          return event.payload.release.html_url;
        break;
        case 'push':
          return 'https://github.com/' + event.repo.name + '/tree/' + event.payload.ref.replace('refs/heads/','');
        break;

      }

    }
  }
};
</script>

<style lang="scss">
  @import "../scss/init/colors";

  .github-feed {
    border-bottom: 1px solid rgba($black, 0.05);
    border-left: 1px solid rgba($black, 0.05);
    font-size: 0.8rem;
    grid-area: github;
    position: relative;

    @media (min-width: 1301px) {
      padding-top: 3.7rem;
    }

    @media (min-width: 1001px) and (max-width: 1300px) {
      padding-top: 2.95rem;
    }

    @media (min-width: 1001px) {
      padding-bottom: 2rem;
      padding-right: 10%;
      padding-left: 2rem;
    }

    @media (max-width: 1000px) {
      padding-top: 2rem;
      padding-bottom: 2rem;
    }

    @media (min-width: 901px) {
      padding-right: 1rem;
      padding-left: 1rem;
    }

    @media (max-width: 900px) {
      padding-right: 2rem;
      padding-left: 2rem;
    }

    @media (max-width: 700px) {
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
    }

    h3, h5 {
      @media (min-width: 1001px) {
        text-align: center;
      }
    }

    h3 {
      letter-spacing: 0.1rem;
      line-height: 1;
      text-transform: uppercase;
      width: 100%;

      @media (min-width: 1301px) {
        top: 2.15rem; left: 0;

        color: rgba($black, 0.045);
        font-size: 4rem;
        position: absolute;
      }

      @media (max-width: 1300px) {
        color: $black;
      }

      @media (min-width: 901px) and (max-width: 1300px) {
        font-size: 3rem;
      }

      @media (max-width: 900px) {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
    }

    h5 {
      font-style: italic;
      font-weight: normal;

      @media (min-width: 1001px) {
        margin-bottom: 3rem;
      }

      @media (min-width: 901px) and (max-width: 1000px) {
        margin-bottom: 2rem;
      }

      @media (max-width: 900px) {
        margin-bottom: 0.5rem;
        position: relative;
        top: -1rem;
      }
    }
  }

  .github-feed__event {
    line-height: 1.33;

    @media (max-width: 700px) {
      display: inline-block;
      margin-right: 1.25rem;
      vertical-align: top;
      width: 200px;
    }

    &:not(:last-of-type) {
      @media (min-width: 701px) {
        margin-bottom: 1.25rem;
      }
    }

    > a:first-of-type {
      display: inline-block;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    > p:first-of-type {
      @media (min-width: 701px) {
        display: inline-block;
        margin-left: 0.5rem;
        vertical-align: top;
        width: calc(100% - 4.5rem);
      }

      @media (max-width: 700px) {
        top: -3.5rem; left: 5%;

        background-color: $white;
        border: 1px solid rgba($gray, 0.1);
        border-radius: 3px;
        padding: 1rem;
        position: relative;
        white-space: normal;
        width: 90%;
      }
    }
  }

  .github-feed__event__avatar {
    border: 1px solid rgba($gray, 0.1);
    border-radius: 3px;
    object-position: center;
    object-fit: cover;

    @media (min-width: 701px) {
      width: 2.5rem; height: 2.5rem;
    }

    @media (max-width: 700px) {
      width: 100%; height: 100%;
    }
  }

  .github-feed__event__time {
    color: $gray;
    display: block;
  }
</style>
