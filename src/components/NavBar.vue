<template>
    <div class="nav-bar">
        <div class="left-nav">
            <std-button title="Home" button-type="nav-button"></std-button>
        </div>
        <div class="left-nav">
            <a href="/AvailableSpaces"><std-button title="Available Spaces" button-type="nav-button"/></a>            
        </div>
        <div class="left-nav">
            <a href="/EditSpaces"><std-button title="Admin Portal" button-type="nav-button"/></a>            
        </div>
        <div class="icon" @click="toggleDropdown()">
            <img :src="`chevron-down.svg`">
        </div>
        <div class="account"> 
        <span class="acc">Hello, Test</span>
        <std-button title="Account Settings" @click="toggleDropdown()" button-type="account-button"></std-button>
            <div v-if="showDropdown" class="dropdown">
                <std-button title="Settings" @click="settings()" button-type="drop-down"/>
                <std-button title="Logout" @click="logoutUser()" button-type="drop-down"/>
            </div>
        </div>
        <div class="icon">
            <img :src="`user.svg`">  
        </div>
    </div>
    <slot></slot>
</template>
  
<script>
import StdButton from '@/components/StdButton.vue'
import { mapActions } from 'vuex'


export default {
    name: 'App',
    components: {
        StdButton
    },
    data() {
        return {
            showDropdown: false
        };
    },
    computed: {
        currentComponent() {
        console.log(window.location.pathname.substring(1))
        return window.location.pathname.substring(1) != '' ? window.location.pathname.substring(1) : 'AvailableSpaces'
        }
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
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');
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
.account{
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