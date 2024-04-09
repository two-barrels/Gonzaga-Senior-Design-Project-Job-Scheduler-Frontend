<template>
    <h1 class="floor-space-title">
      Welcome to the 2Barrels Scheduling Space Application
    </h1>
  <dash-board/>
  </template>
  
  <script>
  import DashBoard from '@/components/DashBoard.vue';
  
  export default {
    name: 'home-page',
    components: {
      'dash-board': DashBoard
    }
  }
  </script>
  
  <style lang="scss" scoped>
    .floor-space-title {
      margin-top: 15px;
      padding-left: 1%;
      padding-right: 1%;
    }
    .video-placement {
        margin-left: 15px
    }
  </style>
  