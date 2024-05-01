<template>
    <h1 class="floor-space-title">
      Settings
    </h1>
    <div class="change-name">
      <h4>Change Account Name</h4>
        <input class="login-form-entry text-box" type="text" v-model="name" placeholder="New Name" />
        <br />
        <Toast />
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
  import { useToast} from 'primevue/usetoast'
  import Toast from 'primevue/toast'
  
  
  export default {
    
    name: 'home-page',
    components: {
      StdButton, 
      Toast
    },
    computed: {
      ...mapGetters(["getUserName", "getUserID",])
    },

    data() {
      return {
        id: "",
        name: "",
        toast: useToast()
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
          this.toast.add({severity: 'success', summary: 'Name changed successfully', life:2000})
          window.location.reload();
        } catch (error) {
          console.error(error)
          this.toast.add({severity: 'error',  summary: "Error changing name", life:2000})
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
    .change-name{
      margin-left: 1%;
    }
    .text-box{
      margin-bottom: 1%;
    }
  </style>
  