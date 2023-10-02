<template>
  <SpaceName spaceID="Conference Room 1"/>
  <CalendarComp/>
</template>

<script>
import SpaceName from './components/SpaceName.vue'
import CalendarComp from './components/CalendarComp.vue'

export default {
  name: 'App',
  components: {
    SpaceName,
    CalendarComp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
