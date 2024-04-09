<template>
  <div class="row">
      <div class="col-4">
        <div 
          class="list-group overflow-auto" 
          style="max-height: 100vh;" 
          id="list-tab" 
          role="tablist"
        >
          <a 
            v-for="(user, idx) in users_data" 
            :key="idx" 
            class="list-group-item list-group-item-action" 
            :id="'list-' + user.email" 
            data-bs-toggle="list" 
            role="tab" 
            :aria-controls="'list-' + user.email" 
            :href="'#' + user.email">{{ user.email }}
          </a>
        </div>
      </div>
      <div class="col-8">
        <div class="tab-content tab-details" id="nav-tabContent">
          <div 
            v-for="(user, idx) in users_data" 
            :key="idx" class="tab-pane fade" 
            :id="user.email" 
            role="tabpanel" 
            :aria-labelledby="'list-' + user.email"
          >
            <user-permission :user="user" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Users from '@/services/users-service'
  import UserPermission from './UserPermission.vue'

  export default {
    name: 'user-management',
    components: {
      'user-permission': UserPermission
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
    .floor-space-name {
      padding-left: 1%;
      padding-right: 1%;
    }

    .tab-details {
      min-height: 100vh;
    }
  </style>
  