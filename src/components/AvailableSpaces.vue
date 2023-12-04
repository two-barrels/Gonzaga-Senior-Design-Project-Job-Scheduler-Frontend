  <template>
    <h1 class="floor-space-name">Available Spaces</h1 >
    <floor-space/>
  </template>
  
  <script>
  import FloorSpace from "@/components/FloorSpace.vue"
  
  export default {
    name: 'available-spaces',
    components: {
      'floor-space': FloorSpace
    }
  }
  </script>
  
  <style lang="scss" scoped>
    .floor-space-name{
      padding-left: 1%;
      padding-right: 1%;
    }
  </style>
  