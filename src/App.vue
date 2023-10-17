<template>
  <SessionManager />
  <component :is="currentComponent"></component>
</template>

<script>
import AvailableSpaces from './components/AvailableSpaces.vue';
import Tmp from './components/Tmp.vue'
import SessionManager from './components/SessionManager.vue'


export default {
  name: 'App',
  components: {
    SessionManager,
    AvailableSpaces,
    Tmp
  },
  computed: {
    currentComponent() {
      console.log(window.location.pathname.substring(1))
      return window.location.pathname.substring(1)
    }
  }
}
</script>

<style>

</style>
