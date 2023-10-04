<template>
    <h1>Available Spaces</h1>
    <FloorSpace floorName="Floor 1"/>
    <FloorSpace floorName="Floor 2"/>
  </template>
  
  <script>
  import FloorSpace from "./FloorSpace.vue"
  
  export default {
    name: 'SingleFloor',
    props: {

    },
    components: {
      FloorSpace
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
  