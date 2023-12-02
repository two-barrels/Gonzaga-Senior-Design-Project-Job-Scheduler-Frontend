<template>
  <div v-if="isLoggedIn">
    <nav-bar>
      <component :is="currentComponent"></component>
      <!-- <component :is="currentComponent" :props="propsToPass"></component> -->
    </nav-bar>
  </div>
  <SessionManager v-else/>
</template>

<script>
import SessionManager from '@/components/SessionManager.vue'
import { mapGetters } from 'vuex'
import AvailableSpaces from '@/components/AvailableSpaces.vue'
import CalendarComp from '@/components/CalendarComp.vue'
import NavBar from '@/components/NavBar.vue'


export default {
  name: 'App',
  components: {
    SessionManager,
    AvailableSpaces,
    CalendarComp,
    NavBar
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    currentComponent() {
      console.log(window.location.pathname.substring(1))
      return window.location.pathname.substring(1) != '' ? window.location.pathname.substring(1) : 'AvailableSpaces'
    },
    // propsToPass() {
    //   return this.$route.query
    // }
  },
}
</script>

<style>

body {
  margin: unset;
  padding: unset;
}

</style>
