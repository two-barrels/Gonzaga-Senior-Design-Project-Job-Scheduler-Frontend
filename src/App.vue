<template>
  <router-view/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
body {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  margin: unset;
  padding: unset;
}
</style>
