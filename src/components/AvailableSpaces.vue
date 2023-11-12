  <template>
    <h1>Available Spaces</h1>
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
  