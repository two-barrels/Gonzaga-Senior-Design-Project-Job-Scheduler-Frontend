<template>
    <h1 class="floor-space-name">Edit Buildings, Floors, or Spaces</h1>
    <building-management/>
    <edit-floor-space/>
  </template>
  
  <script>
  import buildingManagement from "@/components/buildingManagement"
  
  export default {
    name: 'edit-spaces',
    components: {
      'building-management': buildingManagement

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

  .floor-space-name{
      padding-left: 1%;
      padding-right: 1%;
    }
  </style>
  