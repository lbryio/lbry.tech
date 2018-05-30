<template>
  <iframe src="https://lbry-whitepaper.herokuapp.com/" id="whitepaper" v-bind:style="{height: iframeHeight}"></iframe>
</template>

<script>

export default {
  data () {
    return {
      iframeHeight: '10vh'
    }
  },
  mounted () {
    this.iframeHeight = (window.innerHeight - document.getElementById('whitepaper').offsetTop - 10) + 'px';
  },
  name: 'Whitepaper'
}
</script>

<style lang="scss">

#whitepaper {
  width: 100%;
  border: 0;
}

</style>