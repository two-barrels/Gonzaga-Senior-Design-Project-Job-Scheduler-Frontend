<template>
  <AvailableSpaces />
</template>

<script>
import AvailableSpaces from './components/AvailableSpaces.vue';


export default {
  name: 'App',
  components: {
    AvailableSpaces
  },
  data(){
    return {
      
    }
  },
  computed: {

  },
  methods: {
  }
}
</script>

<style>
h1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
p{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
