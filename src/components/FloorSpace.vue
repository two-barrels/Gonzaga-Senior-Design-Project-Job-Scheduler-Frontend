<template>
  <div class="drop-down">
    <vue-collapsible-panel-group>
      <div>
        <vue-collapsible-panel 
          :expanded="false" 
          @click="onGetInfo" 
          v-for="(floor, idx) in floors_data" 
          :key="idx"
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
                v-for="(value, index) in spaces_data"
                :key="index"
              >
                <div v-if="floor.id == value.floor_id" class="ind-floor">
                  <router-link :to="`/calendar/${123}/${value.id}/${value.spaces_name}`">
                  <div class="spaceDesc">
                    <h2>{{ value.spaces_name }}</h2>
                    <p class="DescMargins">Max Occupancy: {{ value.max_occupancy }} </p> 
                    <p class="DescMargins">Space Description: {{ value.floor_id }} </p>
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
</template>

<script>
import {
  VueCollapsiblePanelGroup,
  VueCollapsiblePanel,
} from '@dafcoe/vue-collapsible-panel'
import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'
import http_helper from '@/services/http-helper'
import "@/store/index.js"


export default {
  name: 'floor-space',
  props: {
    floorName: String,
    floorNum: Number
  }, 
  components: {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
    // 'std-button':StdButton
  },
  computed: {
    floors_hash() {
      const hash = {};
      this.floors_data.forEach(floor => { hash[floor.id] = floor.floor_name })
      return hash
    }
  },
  data(){
    return{
      spaces_data: [],
      floors_data: [],
      floor_numbers: []
    }
  },
  async mounted(){
    try{
      const spacesPromise = http_helper.get('spaces') 
      const floorsPromise = http_helper.get('floors')
      const [ spacesResponse, floorsResponse ] = await Promise.all([ spacesPromise, floorsPromise ])  
      this.spaces_data = spacesResponse.data
      this.floors_data = floorsResponse.data
    } catch (error){
      console.error(error)
    }
  },
  methods: {
    printFloors(){
      console.log(this.spaces_data)
      console.log(this.floors_data)
    },
    checkForSpaces(floorId){
      return this.spaces_data.some(space => space.floor_id == floorId)
    }
  }
}
</script>

<style lang="scss" scoped>
a {
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
