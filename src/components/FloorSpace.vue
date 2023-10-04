<template>
    <div class = "floor">
      <vue-collapsible-panel-group>
    <vue-collapsible-panel :expanded="false">
        <template #title>
            {{floorName}}
        </template>
        <template #content>
          <p> Click on a room or desk to check time availability</p>
          <button> Desk 1</button>
          <button> Conference Room 1</button>
        </template>
    </vue-collapsible-panel>
</vue-collapsible-panel-group>
    </div>
  </template>
  
  <script>
  import {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
  } from '@dafcoe/vue-collapsible-panel'
  import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'

  export default {
    name: 'FloorSpace',
    props: {
      floorName: String,
    }, 
    components: {
      VueCollapsiblePanelGroup,
      VueCollapsiblePanel,
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
  </style>
  