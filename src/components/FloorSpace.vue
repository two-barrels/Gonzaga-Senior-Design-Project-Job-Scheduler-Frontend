<template>
    <div class="drop-down" >
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
                  Floor {{ floor.floor_id }} 
                </div>
              </template>
              <template #content>
                <!-- <p> Click on a room or desk to check time availability:</p> -->
                <p> Click on a space to check time availability:</p>
                <hr> 
                <div 
                  class="spaces-buttons"
                  v-for="(value, index) in spaces_data"
                  :key="index"
                >
                  <div v-if="floor.floor_id == value.floor_id" class="ind-floor">
                    <div>
                      <h2>{{ value.spaces_name }}</h2>
                      <p>Max Occupancy: {{ value.max_occupancy }} </p> 
                      <p>Space Description: {{ value.floor_id }} </p>
                      <router-link :to="`/calendar/${123}/${value.id}/${value.spaces_name}`">
                      <calendar-comp space_name='Conference'/>
                        <std-button 
                          title="Scheduler"
                          buttonType="primary-default"
                        />
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
  import StdButton from "@/components/StdButton.vue"

  export default {
    name: 'floor-space',
    props: {
      floorName: String,
      floorNum: Number
    }, 
    components: {
      VueCollapsiblePanelGroup,
      VueCollapsiblePanel,
      'std-button':StdButton
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
        const floorsPromise = http_helper.get('spaces/get_floors')
        const [spacesResponse,floorsResponse] = await Promise.all([spacesPromise, floorsPromise])  
        this.spaces_data = spacesResponse.data
        this.floors_data = floorsResponse.data
      } catch (error){
        console.error(error)
      }
    },
    computed: {
      currentComponent() {
        console.log(window.location.pathname.substring(1))
        return window.location.pathname.substring(1) != '' ? window.location.pathname.substring(1) : 'CalendarComp'
      }
    },
    methods: {
      onGetInfo(){
        console.log("drop-down clicked")
        console.log(this.spaces_data)
        console.log(this.floors_data)
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
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
    background-color: $color-neutral--100;
    padding-left: 1%;
    outline: 1px $color-neutral--200 solid;
    border-radius: 5px;
    margin-top: 1%;
  }
  </style>
  