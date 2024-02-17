<template>
<div class="row">
  <div class="col-4">
    <div class="list-group overflow-auto" style="max-height: 100vh;" id="list-tab" role="tablist" v-for="(user,idx) in users_data" :key="idx">
      <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">{{ user.name}}</a>
    </div>
  </div>
  <div class="col-8">
    <div class="tab-content" id="nav-tabContent" v-for="(user,idx) in users_data" :key="idx">
      <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
    </div>
  </div>
</div>
  </template>
  
  <script>
  import Users from '@/services/users-service'
  import "@/store/index.js"

  export default {
    name: 'user-management',
    components: {
    },
    data(){
      return{
        users_data: []
      }
    },
    async mounted(){
      try{
        const usersResponse = await Users.get('users')
        this.users_data = usersResponse.data
      } catch (error){
          console.error(error)
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
    .floor-space-name{
      padding-left: 1%;
      padding-right: 1%;
    }
  </style>
  