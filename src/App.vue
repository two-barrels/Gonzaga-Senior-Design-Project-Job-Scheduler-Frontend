<template>
  <sign-in-box class="signin-box"/>
</template>

<script>
import SignInBox from './components/SignInBox.vue'

export default {
  name: 'App',
  components: {
    SignInBox
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

.signin-box {
}

</style>
