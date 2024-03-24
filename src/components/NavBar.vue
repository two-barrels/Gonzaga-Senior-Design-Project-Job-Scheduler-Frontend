<template>
    <div class="nav-bar">
        <div>
            <router-link to="/"><std-button title="Home" button-type="nav-button"></std-button></router-link>
        </div>
        <div>
            <router-link to="/available-spaces"><std-button title="Available Spaces" button-type="nav-button"/></router-link>            
        </div>
        <div>
            <router-link v-if="getIfUserAdmin" to="/edit-spaces"><std-button title="Admin Portal" button-type="nav-button"/></router-link>           
        </div>
        <div class="dropdown">
            <button 
                class="btn btn-secondary dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false" 
            >
            <img :src="userIcon"> {{ username }}
            </button>
            <ul class="dropdown-menu">
                <li><std-button title="Settings" @click="settings()" button-type="drop-down"/></li>
                <li><std-button title="Logout" @click="logoutUser()" button-type="drop-down"/></li>
            </ul>
        </div>
    </div>
    <router-view/>
</template>
  
<script>
import StdButton from '@/components/StdButton.vue'
import { mapActions, mapGetters } from 'vuex'


export default {
    name: 'App',
    components: {
        StdButton
    },
    data() {
        return {
            userIcon: require('@/assets/user.svg'),
        }
    },
    computed: {
        ...mapGetters(["getIfUserAdmin", "getUserName"]),
        username() {
          return this.getUserName
        }
    },
    methods: {
        ...mapActions(["logoutUser"]),
    }
}
</script>

<style lang="scss" scoped>
.nav-bar {
    background-color: $color-primary--700;
    width: 100%;
    height: 65px;
    padding: 10px;
    font-family: 'Open Sans', sans-serif;
    display: flex;
    align-items: center;
}
.nav-bar a {
    text-decoration: none;
}

.btn {
  background-color: $color-primary--700 !important;
  color: white !important;
  border-width: 0;
  font-family: 'Open Sans', sans-serif !important;
  font-weight: 900;
}
.dropdown-item{
  background-color: $color-primary--700;
  color: white !important;
}
.dropdown-menu{
  background-color: $color-primary--700;
}
.dropdown{
  margin-left: auto !important;
}

</style>