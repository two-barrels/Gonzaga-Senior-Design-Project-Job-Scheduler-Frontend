<template>
    <div class="container">
        <h1 class="sm-title">Two Barrels Space Scheduler</h1>
        <div class="sm-card">
            <div>
                <h3>Login!</h3>
                <form @submit="loginOrSignup" class="login-form">
                    <input class="login-form-entry" type="text" v-model="email" placeholder="Email" />
                    <br />
                    <input class="login-form-entry" type="password" v-model="password" placeholder="Password" />
                    <br />
                    <span v-if="signInError" class="warning-message">Invalid Username or Password</span>
                    <input @click="type = 'Login'" type="submit" value="Login" class="form-submit" />
                    <input type="submit" value="Sign up" class="form-submit" />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { navigateToRoute } from "@/services/router-helper"
import "@/store/index.js"
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "SessionManager",
    computed: {
        ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn", "signInError"])
    },
    data() {
      return {
        email: "",
        password: "",
        type: "",
      }
    },
    methods: {
        ...mapActions(["registerUser", "loginUser", "logoutUser"]),
        loginOrSignup(event) {
          event.preventDefault()
          if(this.type === "Login") {this.onLogin()}
          else {this.onSignUp()}
        },
        onSignUp() {
          navigateToRoute('sign-up')
        },
        onLogin() {
          let data = {
              user: {
                  email: this.email,
                  password: this.password,
              },
          };
          this.loginUser(data)
          this.resetData()
        },
        resetData() {
            this.email = ""
            this.password = ""
            this.type = ""
        },
    },
}
</script>

<style lang="scss" scoped>
.sm-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  font-family: "Roboto", sans-serif;
}
.container {
  width: 90%;
  margin: 0 auto;
}
.sm-card {
  height: fit-content;
  width: fit-content;
  justify-content: center;
  padding: 80px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}
.sign-up-form {
  width: 100%;
}
.login-form-entry {
  width: 100%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px
}
.form-submit {
  width: 45%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: $color-secondary--500;
  color: #fff;
  border: none;
  margin-left: 2.5%;
  margin-right: 2.5%px;
}
.sign-up-form-submit:hover {
  background-color: #aa4807;
  cursor: pointer;
}

.login-form {
  width: 100%;
}
.logout-button {
  width: 15%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #e26a1a;
  color: #fff;
  border: none;
}
.logout-button:hover {
  background-color: #aa4807;
  cursor: pointer;
}
.table-headers {
  background-color: #e26a1a;
  color: #fff;
  max-width: 90%;
  margin: 0 auto;
}
.table-rows {
  background-color: #f2f2f2;
  margin: 0 auto;
}
.table-row {
  word-break: break-all;
  text-align: center;
  padding: 10px;
}
.table-row-username {
  width: 30%;
}

.warning-message {
  color: $color-danger--500
}
</style>