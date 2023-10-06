<template>
  <CalendarComp/>
</template>

<script>
import CalendarComp from './components/CalendarComp.vue'

export default {
  name: 'App',
  components: {
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
