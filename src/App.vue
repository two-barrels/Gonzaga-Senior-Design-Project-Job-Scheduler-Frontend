<template>
  <div v-if="isLoggedIn">
    <nav-bar>
      <component :is="currentComponent"></component>
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
import EditSpaces from '@/components/EditSpaces.vue'

export default {
  name: 'App',
  components: {
    SessionManager,
    AvailableSpaces,
    CalendarComp,
    NavBar,
    EditSpaces
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    currentComponent() {
      console.log(window.location.pathname.substring(1))
      return window.location.pathname.substring(1) != '' ? window.location.pathname.substring(1) : 'AvailableSpaces'
    }
  },
}
</script>

<style>

body {
  margin: unset;
  padding: unset;
}

</style>
