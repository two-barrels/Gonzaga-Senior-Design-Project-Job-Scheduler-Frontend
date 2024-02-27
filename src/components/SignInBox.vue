<template>
  <div class="signin-form">
    <div class="label">
      Username
    </div>
    <input type="text" class="signin-text-box"/>
    <div class="label">
      Password
    </div>
    <input type="text" class="signin-text-box" />
    <std-button title="Sign In" @click="signin()"/>
  </div>
</template>

<script>
import StdButton from '@/components/StdButton.vue'
import http from '@/services/http-helper.js'

export default {
  name: 'SignInBox',
  components: {
    StdButton
  },
  data() {
    return {
      test: null
    }
  },
  async mounted() {
    try {
      const response = await http.get('users') 
      this.test = response.data
    } catch(err) {
      console.error(err)
    }
  },
  methods: {
    signin() {
    }
  }
}
</script>

<style lang="scss" scoped>
.signin-form {
  background-color: rgb(172, 172, 172);
  border: 1px black solid;
  min-height: 200px;
  max-width: fit-content;
  padding: 50px;
  border-radius: 5px;
  position: absolute;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
}

.label {
  margin-top: 10px;
}

.signin-text-box {
  min-width: 100px;
  margin-top: 10px;
}

.signin-button {
  min-height: 15px;
  width: fit-content;
  padding: 10px;
  border: 1px black solid;
  background-color: aqua;
  border-radius: 5px;
  position: absolute;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
  /* &:hover {
    background-color: rgb(0, 160, 160);
    cursor: pointer;
  } */
}

</style>
  