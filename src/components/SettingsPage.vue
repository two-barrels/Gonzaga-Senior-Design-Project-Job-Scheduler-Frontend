<template>
    <h1 class="floor-space-title">
      Settings
    </h1>
    <div class="change-name">
      <h4>Change Account Name</h4>
        <input class="login-form-entry text-box" type="text" v-model="name" placeholder="New Name" />
        <br />
        <std-button 
          title="Save"
          buttonType="primary-default"
          @click="changeName()"
        />
        
    </div>
  </template>
  
  <script>
  import StdButton from "@/components/StdButton.vue"
  import Users from "@/services/users-service"
  import { mapGetters } from 'vuex'
  
  export default {
    
    name: 'home-page',
    components: {
      StdButton
    },
    computed: {
      ...mapGetters(["getUserName", "getUserID",])
    },

    data() {
      return {
        id: "",
        name: ""
      }
    },
    mounted() {
      this.id = this.getUserID
      this.name = this.getUserName
    },
    methods: {
      async changeName() {
        try {
          Users.put(`users/${this.id}`, { name: this.name })
          window.location.reload();
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
    .floor-space-title {  
      margin-top: 15px;
      padding-left: 1%;
      padding-right: 1%;
      margin-bottom: 1%
    }
    .change-name{
      margin-left: 1%;
    }
    .text-box{
      margin-bottom: 1%;
    }
  </style>
  