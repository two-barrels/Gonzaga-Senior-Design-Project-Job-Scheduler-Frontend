<template>
    <div class = "floor" >
      <vue-collapsible-panel-group >
        <div>
          
          <vue-collapsible-panel :expanded="false" @Click="onGetInfo" v-for="(val, idx) in floors_data" :key="idx">
              <template #title> 
                <div class="displayFloors">
                  Floor {{ val.floor_id }} 
                </div>
              </template>
              <template #content>
                <p> Click on a room or desk to check time availability:</p>
                <hr> 
                <div 
                  class="spaces-buttons"
                  v-for="(value, index) in spaces_data"
                  :key="index"
                >
                  <div v-if="val.floor_id == value.floor_id">
                    <div>
                      <button>{{value.spaces_name }}</button>  
                      <p>Space Description: {{ value.description }}</p>
                      <p>Max Occupancy: {{ value.max_occupancy }}</p>
                      <hr> 
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
    },
    data(){
      return{
        spaces_data: [],
        floors_data: [],
        floor_numbers: []
      }
    },
    async mounted(){
      const spacesPromise = http_helper.get('spaces') 
      const floorsPromise = http_helper.get('spaces/get_floors')
      const [spacesResponse,floorsResponse] = await Promise.all([spacesPromise, floorsPromise])

      if(spacesResponse.error) {
        throw Error
      }
      else {
        this.spaces_data = spacesResponse.data
      }
      if(floorsResponse.error){
        throw Error
      }
      else {
        this.floors_data = floorsResponse.data
      }
    },
    computed: {
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
  <style scoped>
  #title, #content {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
  }
  button {
    background-color: white;
    color: black;
    border-color: green;
    border-radius: 5px;
    transition-duration: 0.4s;
    &::hover {
      background-color: green;
      color: white;
    }
  }

  .hide {
    visibility: hidden !important;
}
  </style>
  