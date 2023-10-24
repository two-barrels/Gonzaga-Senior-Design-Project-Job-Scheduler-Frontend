<template>
    <div class="container">
        <h1 class="sm-title">Two Barrels Sign in Page</h1>
        <div class="sm-card">
            <div v-if="isLoggedIn">
              <component :is="currentComponent"></component>
            </div>
            <div v-else>
                <h3>Sign Up!</h3>
                    <form @submit="onSignUp" class="sign-up-form">
                        <input class="sign-up-form-email" type="email" v-model="signUpEmail" placeholder="Email" />
                        <br />
                        <input
                            type= "password"
                            class= "sign-up-form-password"
                            v-model= "signUpPassword"
                            placeholder= "Password"
                        />
                        <br />
                        <input type="submit" value="Sign up" class="sign-up-form-submit" />
                    </form>
                <hr />
                <br />
                <h3>Login!</h3>
                <form @submit="onLogin" class="login-form">
                    <input class="login-form-email" type="text" v-model="loginEmail" placeholder="Email" />
                    <br />
                    <input class="login-form-password" type="password" v-model="loginPassword" placeholder="Password" />
                    <br />
                    <input type="submit" value="Login" class="login-form-submit" />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import "@/store/index.js"
import { mapActions, mapGetters } from 'vuex'
import AvailableSpaces from '@/components/AvailableSpaces.vue';
import CalendarComp from '@/components/CalendarComp.vue'
export default {
    name: "SessionManager",
  components: {
    AvailableSpaces,
    CalendarComp
  },
    computed: {
        ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"]),
      currentComponent() {
        console.log(window.location.pathname.substring(1))
        return window.location.pathname.substring(1) != '' ? window.location.pathname.substring(1) : 'AvailableSpaces'
      }
    },
    data() {
        return {
        signUpEmail: "",
        signUpPassword: "",
        loginEmail: "",
        loginPassword: "",
        };
    },
    methods: {
        ...mapActions(["registerUser", "loginUser", "logoutUser"]),
        onSignUp(event) {
            event.preventDefault();
            let data = {
            user: {
            email: this.signUpEmail,
            password: this.signUpPassword,
            },
        };
        this.registerUser(data);
        this.resetData();
        },
        onLogin(event) {
            event.preventDefault();
            let data = {
                user: {
                    email: this.loginEmail,
                    password: this.loginPassword,
                },
            };
            this.loginUser(data);
            this.resetData();
        },
        resetData() {
            this.signUpEmail = "";
            this.signUpPassword = "";
            this.loginEmail = "";
            this.loginPassword = "";
        },
    },
}
</script>

<style scoped>
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
  width: 75%;
  padding: 20px;
  margin: 0 auto;
  height: 25em;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}
.sign-up-form {
  width: 100%;
}
.sign-up-form-email {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.sign-up-form-password {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.sign-up-form-submit {
  width: 15%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #e26a1a;
  color: #fff;
  border: none;
}
.sign-up-form-submit:hover {
  background-color: #aa4807;
  cursor: pointer;
}

.login-form {
  width: 100%;
}
.login-form-email {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.login-form-password {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.login-form-submit {
  width: 15%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #e26a1a;
  color: #fff;
  border: none;
}
.login-form-submit:hover {
  background-color: #aa4807;
  cursor: pointer;
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
</style>