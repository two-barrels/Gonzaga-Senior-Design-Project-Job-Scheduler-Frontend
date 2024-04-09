<template>
  <div class="scroll">
    <div v-if="showFloorEditPopup">
      <h3> Edit Floor</h3>
    </div>
    <div v-else>
      <h3> Create Floor </h3>
    </div>
    <label class="name" for="sname">Floor Name:</label><br>
    <input type="text" class="in_name" v-model="floorDataHold.floor_name"><br>
    <label class="flr" for="floor_num">Associated Building:</label><br>
    <select name="Floors" class="in_flr">
    <option v-for="(val, idx) in buildings" :key="idx" @click="changeBuilding(val.id)"> {{val.name}}</option> 
    </select><br>
    <div v-if="showFloorEditPopup">
        <std-button 
          class="save"
          @click="saveFloorChanges()" 
          title = "Save" 
          buttonType="upsell-default"
          />
        <std-button 
          class="exit1"
          title="Cancel"
          buttonType="alert-default"
          @click="closePopup()"
          />
      </div>
      <div v-else>
        <std-button @click="createFloor()" 
          class="save"
          title = "Create Floor" 
          buttonType="upsell-default"
          />
        <std-button @click="closePopup()"
          class="exit"
          title="Cancel"
          buttonType="alert-default"
          /> 
      </div>
  </div>
</template>
  
<script>
  
  import StdButton from "@/components/StdButton.vue"
  
  export default {
    name: 'floor-popup',
    components:{
      'std-button':StdButton
    },
    props:{
        floorData: Object,
        showEditPage: Boolean,
        buildingsData: Array
    },
    data(){
      return{
        showFloorEditPopup: true,
        floorDataHold: {},
        buildings: []
      }
    },
    async mounted(){
      this.buildings = this.buildingsData
      this.floorDataHold = this.floorData
      this.showFloorEditPopup = this.showEditPage
    },
    methods:{
      saveFloorChanges() {
        this.$emit('save-floor-changes', this.floorDataHold)
      },
      changeBuilding(buildingVal){
        this.floorDataHold.building_id = buildingVal
      },
      createFloor() {
        this.$emit('create-floor', this.floorDataHold)
      },
      closePopup() {
        this.$emit('close-popup-floor')
      }
    }
  }
  
</script>
<style lang="scss">
.scroll{
  overflow-x: hidden;
  overflow-y: auto;
}
.h3{
  text-align:center;
}
.std-button{
  display: inline;
}
.save{
  display: inline-block;
}
.exit{
  display: inline;
}
.exit1{
  display: inline;
}
.in_det{
  &:focus{
    padding: 2px;
    border: 4px solid rgb(0, 160, 160);
    border-radius: 2%;
  }
}
.in_flr{
  &:focus{
    padding: 4px;
    border: 4px solid rgb(0, 160, 160);
    border-radius: 2%;
  }
}
.in_max{
  &:focus{
    padding: 2px;
    border: 4px solid rgb(0, 160, 160);
    border-radius: 2%;
  }
}
.in_name{
  &:focus{
    padding: 2px;
    border: 4px solid rgb(0, 160, 160);
    border-radius: 2%;
  }
}
</style>