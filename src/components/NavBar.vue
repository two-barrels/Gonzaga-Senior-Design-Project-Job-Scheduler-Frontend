<template>
    <div class="nav-bar">
        <std-button title="Options" @click="toggleDropdown()" button-type="std-button"></std-button>
        <div v-if="showDropdown" class="dropdown">
            <a href="/AvailableSpaces"><std-button title="Spaces" button-type="login-button"/></a>
            <a href="/EditSpaces"><std-button title="Admin Portal" button-type="login-button"/></a>
            <std-button title="settings" @click="settings()" button-type="login-button"/>
            <std-button title="logout" @click="logoutUser()" button-type="login-button"/>
        </div>
    </div>
    <router-view/>
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
.dropdown {
    background-color: grey;
    min-height: 30px;
    width: 100px;
    position: absolute;
    z-index: 4;
}

.nav-bar {
    background-color: $color-primary--50;
    width: 100%;
    height: 60px;
    padding: 5px;
    position: relative;
}

</style>