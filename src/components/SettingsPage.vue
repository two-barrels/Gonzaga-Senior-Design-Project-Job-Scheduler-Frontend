<template>
    <h1 class="floor-space-title">
      Settings
    </h1>
    <div>
      <h3>Change Account Name</h3>
        <input class="login-form-entry" type="text" v-model="name" placeholder="New Name" />
        <br />
        <std-button 
          title="Save"
          buttonType="primary-default"
          @click="changeName()"
        />

    </div>
  <dash-board/>
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
    }
    .form-format {
      margin-left: 1%;
      margin-right: 55%;
    }
  </style>
  