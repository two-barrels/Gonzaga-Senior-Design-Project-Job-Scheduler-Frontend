  <template>
    <h1 class="floor-space-name">Available Spaces</h1 >
    <building-space/>
  </template>
  
  <script>
  //import FloorSpace from "@/components/FloorSpace.vue"
  import BuildingSpace from '@/components/BuildingSpace.vue'

  export default {
    name: 'available-spaces',
    components: {
      'building-space': BuildingSpace
    }
  }
  </script>
  
  <style lang="scss" scoped>
    .floor-space-name{
      padding-left: 1%;
      padding-right: 1%;
    }
  </style>
  