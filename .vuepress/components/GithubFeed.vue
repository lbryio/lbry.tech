<template>

  <div id="github-feed">

    <div class="last-updated" v-on:click="updateFeed">Last updated: {{ formatDate(lastUpdated) }}</div>
    
    <div v-for="event in events" class="event">
      <a v-bind:href="event.actor.url" target="_blank">
        <img v-bind:src="event.actor.avatar_url" class="avatar"> {{ event.actor.display_login }}
      </a>
      <template v-if="event.type == 'CommitCommentEvent'">
        commented on <a v-bind:href="event.payload.comment.url">commit</a>
      </template>
      <template v-else-if="event.type == 'CreateEvent'">
        created {{ event.payload.ref_type }} '{{ event.payload.ref }}'
      </template>
      <template v-else-if="event.type == 'DeleteEvent'">
        deleted {{ event.payload.ref_type }} '{{ event.payload.ref }}'
      </template>
      <template v-else-if="event.type == 'ForkEvent'">
        forked <a v-bind:href="event.repo.url" target="_blank">{{ event.repo.name }}</a> to <a v-bind:href="event.payload.forkee.url" target="_blank">{{ event.payload.forkee.name }}</a>
      </template>
      <template v-else-if="event.type == 'IssueCommentEvent'">
        commented on <template v-if="event.payload.issue.pull_request">pull request</template><template v-else>issue</template>&nbsp;<a v-bind:href="event.payload.issue.url" target="_blank">{{ event.payload.issue.title }}</a>
      </template>
      <template v-else-if="event.type == 'IssuesEvent'">
        {{ event.payload.action }} issue <a v-bind:href="event.payload.issue.url" target="_blank">{{ event.payload.issue.title }}</a>
      </template>
      <template v-else-if="event.type == 'PullRequestEvent'">
        {{ event.payload.action }} pull request <a v-bind:href="event.payload.pull_request.url" target="_blank">{{ event.payload.pull_request.title }}</a>
      </template>
      <template v-else-if="event.type == 'PullRequestReviewCommentEvent'">
        commented on pull request <a v-bind:href="event.payload.pull_request.url" target="_blank">{{ event.payload.pull_request.title }}</a>
      </template>
      <template v-else-if="event.type == 'PushEvent'">
        pushed to <span v-html="refToLink(event.payload.ref, event.repo.name)"></span>
      </template>
      <template v-else-if="event.type == 'ReleaseEvent'">
        released <a v-bind:href="event.payload.release.url" target="_blank">{{ event.payload.release.tag_name }}</a>
      </template>
      <template v-else-if="event.type == 'WatchEvent'">
        starred the repo
      </template>
      in <a v-bind:href="event.repo.url" target="_blank">{{ event.repo.name }}</a>
      <div class="time-ago">{{ event.created_at | moment('from') }}</div>
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
    refToLink (ref, repo) {
      
      return "<a target='_blank' href='https://github.com/" + repo + "/tree/" + ref.replace('refs/heads/','') + "'>" + ref.replace('refs/heads/','') + "</a>";
    
    },
    formatDate (date) {

      return date.toLocaleString('en-US');

    }
  }
};
</script>

<style lang="scss">

#github-feed {
  .last-updated {
    text-align: right;
    color: #777;
    font-style: italic;
  }
  .event {
    padding: 0.5rem 0;
    border-bottom: 1px solid #ccc;
  }
  .avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
  .time-ago {
    color: #777;
    font-style: italic;
    font-size: 0.7rem;
    float: right;
    padding: 0.7rem 0 0 0;
  }
}

</style>