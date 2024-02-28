<template>
    <div class="nav-bar">
        <div class="left-nav">
            <router-link to="/"><std-button title="Home" button-type="nav-button"></std-button></router-link>
        </div>
        <div class="left-nav">
            <router-link to="available-spaces"><std-button title="Available Spaces" button-type="nav-button"/></router-link>            
        </div>
        <div class="left-nav">
            <router-link v-if="getIfUserAdmin" to="/edit-spaces"><std-button title="Admin Portal" button-type="nav-button"/></router-link>           
        </div>
        <div class="icon" @click="toggleDropdown()">
            <img :src="`chevron-down.svg`">
        </div>
        <div class="account-box"> 
            <span class="acc">Hello, Test</span>
            <std-button 
                class="user-dropdown"
                title="Account Settings" 
                @click="toggleDropdown()" 
                button-type="account-button"
            >
            </std-button>
            <div v-if="showDropdown" class="dropdown">
                <std-button title="Settings" @click="settings()" button-type="drop-down"/>
                <std-button title="Logout" @click="logoutUser()" button-type="drop-down"/>
            </div>
        </div>
        <div class="icon">
            <img :src="`user.svg`">  
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
            showDropdown: false
        }
    },
    computed: {
        ...mapGetters(["getIfUserAdmin"])
    },
    methods: {
        ...mapActions(["logoutUser"]),
        toggleDropdown() {
            this.showDropdown = !this.showDropdown
        },
        goToAdminPortal(){

        }
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
}
.nav-bar a{
    text-decoration: none;
}
.left-nav{
    float: left;
    text-decoration: none;
}
.account-box{
    float: right;
}
.acc{
    color: $color-primary--100;
    font-size: small;
}
.icon{
    float: right;
    padding: 5px;
}

</style>