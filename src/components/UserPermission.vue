<template>
  <div>
    <h2>{{ user.email }}'s Role: {{ role }}</h2> 
    <Toast/>
    <std-button 
      title="Change Role"
      buttonType="primary-default"
      @click="changeAssignment"
    />

  </div>
  <br>
  <h3>Current Access to Buildings and Floors</h3>
  <p>Select building to view {{ user.email }}'s access to floors and spaces</p>
  <vue-collapsible-panel-group class="drop-down">
    <vue-collapsible-panel
    :expanded="false"
    v-for="(building, idx) in buildings"
    :key="idx">
    <template #title>
      Building
    </template>
    <template #content>
      This is building
    </template>
    </vue-collapsible-panel>
  </vue-collapsible-panel-group>
  <br>

  <h3>Edit Access to Buildings and Floors</h3>
  <vue-collapsible-panel-group class="drop-down">
    <vue-collapsible-panel :expanded="false">
    <template #title>
      Edit Building Access
    </template>
    <template #content>
      Click on Building to add access
      <div 
        class="ind-floor" 
        @click="buttonClicked"
        v-for="(building, idx) in buildings"
        :key="idx">
        Building {{ building.name }}
      </div>
      <hr>
      Click on Building to remove access
      <div 
      class="ind-floor" 
      @click="buttonClicked"
      v-for="(building, idx) in buildings"
      :key="idx">
        Building {{ building.name }}
      </div>
    </template>
    </vue-collapsible-panel>
  </vue-collapsible-panel-group>
  <br>
  <vue-collapsible-panel-group class="drop-down">
    <vue-collapsible-panel :expanded="false">
    <template #title>
      Edit Building Access
    </template>
    <template #content>
      Click on Building to add access
      <div class="ind-floor">
        cheese
      </div>
      <hr>
      Click on Building to remove access
      <div class="ind-floor" @click="buttonClicked">
        cheese
      </div>
    </template>
    </vue-collapsible-panel>
  </vue-collapsible-panel-group>
  <br>
  <vue-collapsible-panel-group class="drop-down">
    <vue-collapsible-panel :expanded="false">
    <template #title>
      Edit Space Access
    </template>
    <template #content>
      Click on Space to add access
      <div class="ind-floor">
        cheese
      </div>
      <hr>
      Click on Space to remove access
      <div class="ind-floor" @click="buttonClicked">
        (name of Space), Building (name), Floor (name)
      </div>
    </template>
    </vue-collapsible-panel>
  </vue-collapsible-panel-group>
</template>
<script>
  import StdButton from "@/components/StdButton.vue"
  import {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
  } from '@dafcoe/vue-collapsible-panel'
  import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'
  import Assignments from '@/services/assignments-service'
  import BuildingService from '@/services/building-service'
  import { useToast } from 'primevue/usetoast'
  import Toast from 'primevue/toast'

  export default {
    name: 'user-permission',
    components: {
      VueCollapsiblePanelGroup,
      VueCollapsiblePanel,
      'std-button':StdButton,
      Toast
    },
    props: {
      user: Object,
    },
    data() {
      return {
        hasClick: false,
        isAdminVisible: false,
        assignments: [],
        buildings: [],
        currentBuildings: [],
        floors: [],
        spaces: [],
        toast: useToast(),
        currentAccess: []
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
       },
      buildingId() {
        return this.user.assignments.find(assignment => assignment.role.reference_type === 'building').id
      }

    },
    async mounted(){
      try{
        const assignmentsResponse = await Assignments.get(`assignments/${this.userId}`)
        this.assignments = assignmentsResponse.data
        this.isAdminVisible = this.isAdmin
        const buildingsResponse = await BuildingService.getAll()
        this.currentBuilding = buildingsResponse.data
      } catch (error){
          console.error(error)
      }
    },
    methods: {
      buttonClicked(){
        console.log(this.buildings)
      },
      async changeAssignment(){
        try {
          Assignments.changeAdminStatus({id: this.user.id})
          this.isAdminVisible = !this.isAdminVisible
          this.toast.add({severity: 'success', summary: 'Role Changed Successfully', life:2000})
        } catch(error){
            console.error(error)
            this.toast.add({severity: 'error',  summary: "Error Changing Role", life:2000})
        }
      },
      async changeAssign(){
        try {
          console.log(this.isAdminVisible)
          await this.isAdminVisible ? 
            Assignments.delete(this.adminAssignmentId) : 
            Assignments.create({ user_id: this.user.id, role_id: this.adminRoleId })
          this.isAdminVisible = !this.isAdminVisible
        } catch(error){
        console.error(error)
        }
      },
      async addBuilding(){
        try{
          const assignmentsResponse = await Assignments.create({ user_id: this.user.id, role_id: this.buildingId  })
          this.addBuildings = assignmentsResponse.data
      } catch (error){
          console.error(error)
      }
      },
      async deleteBuilding(){
        try{
          const assignmentsResponse = await Assignments.get(`assignments/${this.userId}`)
          this.assignments = assignmentsResponse.data
          this.isAdminVisible = this.isAdmin
          const buildingsResponse = await BuildingService.getAll()
          this.buildings = buildingsResponse.data
      } catch (error){
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
.ind-floor{
  padding-bottom: 1%;
  margin-bottom: 1%;
  background-color: #33333312;
  padding-left: 1%;
  outline: 1px $color-neutral--200 solid;
  border-radius: 5px;
  padding-top: 1%;
}
</style>
      