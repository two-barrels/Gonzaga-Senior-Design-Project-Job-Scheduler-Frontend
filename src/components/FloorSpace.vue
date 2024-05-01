<template>
  <div class="row">
  <div class="col-4">
    <div 
      class="list-group overflow-auto" 
      style="max-height: 100vh;" 
      id="list-tab" 
      role="tablist"
    >
    <div
      v-for="building in buildings" 
      :key="building.id" 
    >
      <a 
        class="list-group-item list-group-item-action"
        :id="'list-' + building.buildingIdx" 
        data-bs-toggle="list" 
        role="tab"
        :aria-controls="'list-' + building.id" 
        :href="'#' + building.id"
      >
      <div> {{building.name}} </div>
      </a>
      </div>
    </div>
  </div>
  <div class="col-8">
    <div class="tab-content" id="nav-tabContent">
      <div 
      v-for="building in buildings" 
          :key="building.id"
          class="tab-pane fade"
          :id="building.id"
          role="tabpanel"
          :aria-labelledby="'list-' + building.id"
      >
      <div class="drop-down">
      <vue-collapsible-panel-group>
      <div v-for="floor in floors" 
          :key="floor.id">
        <vue-collapsible-panel 
          :expanded="false" 
          @click="onGetInfo" 
          v-if="building.id === floor.building_id"
        >
            <template #title> 
              <div class="floor-title">
                {{ floor.floor_name }} 
              </div>
            </template>
            <template #content>
              <div v-if="!checkForSpaces(floor.id)">
                <p> No Spaces Available to Reserve</p>   
              </div>
              <div v-else>
                <p>Click on a Space to check time availability: </p>
                <hr>
              <div 
                class="spaces-buttons"
                v-for="space in spaces"
                :key="space.id"
              >
                <div v-if="floor.id == space.floor_id" class="ind-floor">
                  <router-link :to="`/calendar/${123}/${space.id}/${space.spaces_name}`" class="a-links">
                  <div class="spaceDesc">
                    <h2>{{ space.spaces_name }}</h2>
                    <p class="DescMargins">Max Occupancy: {{ space.max_occupancy }} </p> 
                    <p class="DescMargins">Space Description: {{ space.floor_id }} </p>
                    <calendar-comp space_name='Conference'/>
                  </div>
                </router-link>
                </div>
               </div>
              </div>
            </template>
        </vue-collapsible-panel>            
      </div>
    </vue-collapsible-panel-group>
  </div>
      </div>
    </div>
  </div>
</div>
  

</template>

<script>
import {
  VueCollapsiblePanelGroup,
  VueCollapsiblePanel,
} from '@dafcoe/vue-collapsible-panel'
import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'
import Buildings from '@/services/building-service'
import Floors from '@/services/floor-service'
import Spaces from '@/services/space-service'
import Assignments from '@/services/assignments-service'
import "@/store/index.js"
import { mapGetters } from 'vuex'


export default {
  name: 'floor-space',
  props: {
    floorName: String,
    floorNum: Number
  }, 
  components: {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
  },
  computed: {
    ...mapGetters(['getUserRoles']),
    floors_hash() {
      const hash = {};
      this.floors.forEach(floor => { hash[floor.id] = floor.floor_name })
      return hash
    }
  },
  data(){
    return{
      spaces: [],
      floors: [],
      buildings: [],
      assignments: []
    }
  },
  async mounted(){
    try{
      const assignmentsResponse = await Assignments.assignmentsForCurrentUser()
      this.assignments = assignmentsResponse.data

      const buildingsResponse = await Buildings.getByIds(this.assignments.filter(assignment => assignment.role.reference_type === 'building').map(assignment => assignment.role.associated_id))
      this.buildings = buildingsResponse.data

      const floorsResponse = await Floors.getByIds(this.assignments.filter(assignment => assignment.role.reference_type === 'floor').map(assignment => assignment.role.associated_id))
      this.floors = floorsResponse.data

      const spacesResponse = await Spaces.getByIds(this.assignments.filter(assignment => assignment.role.reference_type === 'space').map(assignment => assignment.role.associated_id))
      this.spaces = spacesResponse.data
      
    } catch (error){
      console.error(error)
    }
    this.roles = this.getUserRoles
    console.log("yes")
    console.log(this.roles)
  },
  methods: {
    checkForSpaces(floorId){
      return this.spaces.some(space => space.floor_id == floorId)
    }
  }
}
</script>

<style lang="scss" scoped>
.a-links{
    all: unset;
  }
.drop-down{
  text-align: left;
  color: black;
  line-height: 32px;
  padding-left: 1%;
  padding-right: 1%;
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
.spaceDesc {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
}
.DescMargins {
  flex-shrink: 0;
  margin-bottom: 0;
}

</style>
