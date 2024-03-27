<template>
  <div>
    <h2>{{ user.email }}'s Role: {{ role }}</h2> 
    <std-button 
      title="Change Role"
      buttonType="primary-default"
      @click="changeAssignment"
    />

  </div>
  <br>
  <h3>Current Access to buildings/floors</h3>
  <p>Select building to view {{ user.email }}'s access to floors and spaces</p>

  <vue-collapsible-panel-group class="drop-down">
    <vue-collapsible-panel
      :expanded="false"
    >
    <template #title>
      Building 1
    </template>
    <template #content>
      (list floors and spaces here for Building 1)
    </template>
    </vue-collapsible-panel>
    <vue-collapsible-panel
      :expanded="false"
    >
      <template #title>
        Building 2
      </template>
      <template #content>
        (list floors and spaces for Building 2)
      </template>
    </vue-collapsible-panel>
  </vue-collapsible-panel-group>

  <br>
  <std-button 
      title="Edit Building and Floor Access"
      buttonType="primary-default"
    />
</template>
<script>
  import StdButton from "@/components/StdButton.vue"
  import {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
  } from '@dafcoe/vue-collapsible-panel'
  import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'
  import Assignments from '@/services/assignments-service'

  export default {
    name: 'user-permission',
    components: {
      VueCollapsiblePanelGroup,
      VueCollapsiblePanel,
      'std-button':StdButton
    },
    props: {
      user: Object,
    },
    data() {
      return {
        hasClick: false,
        isAdminVisible: false,
        assignments_data: []
      }
    },
    computed: {
      isAdmin() {
        return this.user.assignments.some(assignment => assignment.role.name === 'Admin')
      },
      role() {
        return this.isAdminVisible ? "Admin" : "Standard"
      },
      adminRoleId() {
        return this.user.assignments.find(assignment => assignment.role.name === 'Admin').role.id
      },
      adminAssignmentId() {
        return this.user.assignments.find(assignment => assignment.role.name === 'Admin').id
      }

    },
    async mounted(){
      try{
        const assignmentsResponse = await Assignments.get(`assignments/${this.userId}`)
        this.assignments_data = assignmentsResponse.data
        this.isAdminVisible = this.isAdmin
      } catch (error){
          console.error(error)
      }
    },
    methods: {
      buttonClicked(){
        this.hasClick = !this.hasClick
        console.log("click")
        console.log(this.assignments_data)
      },
      async changeAssignment(){
        try {
          Assignments.post('assignments/change_admin_status', { id: this.user.id})
          this.isAdminVisible = !this.isAdminVisible
        } catch(error){
        console.error(error)
        }
      },
      async changeAssign(){
        try {
          console.log(this.isAdminVisible)
          await this.isAdminVisible ? 
            Assignments.delete(this.adminAssignmentId) : 
            Assignments.post('assignments', { user_id: this.user.id, role_id: this.adminRoleId })
          this.isAdminVisible = !this.isAdminVisible
        } catch(error){
        console.error(error)
        }
      }
    }
  }
  
  </script>
  
<style lang="scss" scoped>
.drop-down{
  width: 45%;
}
</style>
      