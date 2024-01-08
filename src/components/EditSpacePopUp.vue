<template>
  <h3> Edit Space </h3>
      <form>
        <label for="sname">Space Name:</label><br>
        <input type="text" class="sname" v-model="spaceDataHold.spaces_name"><br>
        <label for="floor_num">Floor Name:</label><br>
        <select name="Floors">
        <option v-for="(val, idx) in floor" :key="idx" @click="changeFloor(val.floor_id)"> {{val.floor_id}}</option> 
        </select><br>
        <label for="max_num">Max Occupancy:</label><br>
        <input type="number" class="max_num" min="1" v-model="spaceDataHold.max_occupancy"><br>
        <label>Space Details:</label><br>
        <textarea class="descript" rows="7" cols="50" v-model="spaceDataHold.description"></textarea><bbr></bbr>
        <div v-if="checkA">
          <Button @click="saveChanges()" class ="editbuttsave" label = "Save" > Save </Button>
          <button @click="closePopup()"> Exit </button> 
        </div>
        <div v-else>
          <Button @click="createSpace()" class ="exitbuttsave" label = "Create Space" > Create Space </Button>
          <button @click="createSpacePopUp()">Exit</button> 
          
        </div>
      </form>
</template>
<script>

import Button from 'primevue/button'
export default {
  name: 'space-popup',
  props:{
      spaceData: Object,
      floorData:Array,
      check: Boolean
  },

  components:{
    Button
  },
  data(){
      return{
          spaceDataHold: {},
          checkA: true,
          floor: []
      }
  },
  async mounted(){
    this.spaceDataHold = this.spaceData
    this.checkA = this.check
    this.floor = this.floorData
  },
  methods:{
      changeFloor(floorVal){
        console.log(floorVal)
        this.spaceDataHold.floor_id = floorVal
      },
      saveChanges() {
        this.$emit('save-changes', this.spaceDataHold)
      },
      createSpace() {
        this.$emit('create-space', this.spaceDataHold)
        this.createSpacePopUp()
      },
      closePopup() {
        this.$emit('close-popup')
      },
      createSpacePopUp(){
        this.$emit('create-space-pop-up')
      }
  }
}
</script>
<style lang="scss">

</style>