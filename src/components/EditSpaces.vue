<template>
    <h1>Edit Available Spaces</h1>
    <edit-floor-space/>
  </template>
  
  <script>
  import EditFloorSpace from "./EditFloorSpace.vue"
  
  export default {
    name: 'edit-spaces',
    components: {
      'edit-floor-space': EditFloorSpace
    }
  }
  </script>
  
  <style>
  h1 {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 60px;
  }
  p{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
  }
  </style>
  