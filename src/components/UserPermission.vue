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
  <h3>Edit Access to Buildings, Floors, and Spaces</h3>
  <vue-collapsible-panel-group class="drop-down">
    <vue-collapsible-panel :expanded="false">
    <template #title>
      Edit Building Access
    </template>
    <template #content>
      Click on Building to add access
      <div 
        @click="buttonClicked"
        v-for="building in buildings"
        :key="building.id">
          <div 
            class="ind-floor" 
            v-if="!buildingMatch(building.id)"
            @click="addAssignment(findBuildingID(building.id))"
          >
            {{ building.name }}
          </div>
      </div>
      <hr>
      Click on Building to remove access
      <div 
        class="ind-floor" 
        @click="buttonClicked"
        v-for="assignment in buildingAssignments"
        :key="assignment.id"
      >
          <div @click="deleteAssignment(assignment.id)">
            {{ assignment.role.name }}
          </div>
      </div>
    </template>
    </vue-collapsible-panel>
  </vue-collapsible-panel-group>

  <!-- FLOOR ACCESS -->
  <br>
  <vue-collapsible-panel-group class="drop-down">
    <vue-collapsible-panel :expanded="false">
    <template #title>
      Edit Floor Access
    </template>
    <template #content>
      Click on Floor to add access
      <div 
        v-for="floor in floors"
        :key="floor.id"
        >
          <div
          class="ind-floor" 
          v-if="!floorMatch(floor.id)"
          @click="addAssignment(findFloorID(floor.id))"
          >
            {{ floor.floor_name}} , {{ findBuildingName(floor.building_id) }}
          </div>
      </div>
      <hr>
      Click on Floor to remove access
      <div 
        class="ind-floor" 
        v-for="assignment in floorAssignments"
        :key="assignment.id">
          <div @click="deleteAssignment(assignment.id)">
            {{ assignment.role.name}}, 
          </div>
      </div>
    </template>
    </vue-collapsible-panel>
  </vue-collapsible-panel-group>

   <!-- SPACE ACCESS -->
   <br>
  <vue-collapsible-panel-group class="drop-down">
    <vue-collapsible-panel :expanded="false">
    <template #title>
      Edit Space Access
    </template>
    <template #content>
      Click on Space to add access
      <div 
        v-for="space in spaces"
        :key="space.id"
        >
          <div
          class="ind-floor" 
          v-if="!spaceMatch(space.id)"
          @click="addAssignment(findSpaceID(space.id))"
          >
            {{ space.spaces_name}} , {{ findFloorName(space.floor_id) }}
          </div>
      </div>
      <hr>
      Click on Space to remove access
      <div 
        class="ind-floor" 
        v-for="assignment in spaceAssignments"
        :key="assignment.id">
          <div @click="deleteAssignment(assignment.id)">
            {{ assignment.role.name}}, 
          </div>
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
  import Roles from '@/services/roles-service'
  import { useToast } from 'primevue/usetoast'
  import Toast from 'primevue/toast'
  import Floors from '@/services/floor-service'
  import Spaces from '@/services/space-service'

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
        floors: [],
        spaces: [],
        toast: useToast(),
        currentAccess: [],
        roles: []
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
      buildingAssignments() {
        return this.assignments.filter(
          assignment => assignment.user_id === this.user.id && assignment.role.reference_type === 'building'
        )
      },
      floorAssignments(){
        return this.assignments.filter(
          assignment => assignment.user_id === this.user.id && assignment.role.reference_type === 'floor'
        )
      },
      spaceAssignments(){
        return this.assignments.filter(
          assignment => assignment.user_id === this.user.id && assignment.role.reference_type === 'space'
        )
      },

      currentFloors() {
        return this.assignments.filter(assignment => {
          return assignment.user_id === this.user.id &&
            assignment.role.reference_type === 'floor' &&
            this.floors.some(floor => floor.id === assignment.reference_id)
        })
      },
      currentSpaces() {
        return this.assignments.filter(assignment => {
          return assignment.user_id === this.user.id &&
            assignment.role.reference_type === 'space' &&
            this.spaces.some(space => space.id === assignment.reference_id)
        })
      },
    },
    async mounted(){
      try{
        const assignmentsResponse = await Assignments.getAll()
        this.assignments = assignmentsResponse.data

        this.isAdminVisible = this.isAdmin

        const buildingsResponse = await BuildingService.getAll()
        this.buildings = buildingsResponse.data

        const rolesResponse = await Roles.getAll()
        this.roles = rolesResponse.data

        const floorsResponse = await Floors.getByBuildings(this.buildingAssignments.map(assignment => assignment.role.associated_id))
        this.floors = floorsResponse.data

        const spacesResponse = await Spaces.getByFloors(this.floorAssignments.map(assignment => assignment.role.associated_id))
        this.spaces = spacesResponse.data
      } catch (error){
          console.error(error)
      }
    },
    methods: {
      buildingMatch(id){
        return this.buildingAssignments.some(building => building.role.associated_id === id)
      },
      floorMatch(id){
        return this.floorAssignments.some(floor => floor.role.associated_id === id)
      },
      spaceMatch(id){
        return this.spaceAssignments.some(space => space.role.associated_id === id)
      },
      findBuildingName(buildingId){
        return this.buildings.find(building => building.id === buildingId)?.name
      },
      findFloorName(floorId){
        return this.floors.find(floor => floor.id === floorId)?.floor_name
      },
      findBuildingID(id) {
        return this.roles.find(role => role.associated_id === id)?.id
      },
      findFloorID(id) {
        return this.roles.find(role => role.associated_id === id)?.id
      },
      findSpaceID(id) {
        return this.roles.find(role => role.associated_id === id)?.id
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
      async addAssignment(roleId){
        try{
          await Assignments.create({ user_id: this.user.id, role_id: roleId })
          const assignmentsResponse = await Assignments.getAll()
          this.assignments = assignmentsResponse.data
          const floorsResponse = await Floors.getByBuildings(this.buildingAssignments.map(assignment => assignment.role.associated_id))
          this.floors = floorsResponse.data

          const spacesResponse = await Spaces.getByFloors(this.floorAssignments.map(assignment => assignment.role.associated_id))
          this.spaces = spacesResponse.data
      } catch (error){
          console.error(error)
      }
      },
      async deleteAssignment(roleId){
        try{

          await Assignments.delete(roleId)
          const assignmentsResponse = await Assignments.getAll()
          this.assignments = assignmentsResponse.data
          const floorsResponse = await Floors.getByBuildings(this.buildingAssignments.map(assignment => assignment.role.associated_id))
          this.floors = floorsResponse.data
          const spacesResponse = await Spaces.getByFloors(this.floorAssignments.map(assignment => assignment.role.associated_id))
          this.spaces = spacesResponse.data
          
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
      