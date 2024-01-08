<template>
  <h3> Edit Space </h3>
      <form>
        <label class="name" for="sname">Space Name:</label><br>
        <input type="text" class="in_name" v-model="spaceDataHold.spaces_name"><br>
        <label class="flr" for="floor_num">Floor Name:</label><br>
        <select name="Floors" class="in_flr">
        <option v-for="(val, idx) in floor" :key="idx" @click="changeFloor(val.floor_id)"> {{val.floor_id}}</option> 
        </select><br>
        <label class="labels" for="max_num">Max Occupancy:</label><br>
        <input type="number" class="in_max" min="1" v-model="spaceDataHold.max_occupancy"><br>
        <label class="det">Space Details:</label><br>
        <textarea class="in_det" rows="7" cols="50" v-model="spaceDataHold.description"></textarea><bbr></bbr>
        <div v-if="checkA">
          <std-button 
            class="save"
            @click="saveChanges()" 
            title = "Save" 
            buttonType="primary-default"> 
          </std-button>
          <std-button 
            class="exit"
            title="Exit"
            buttonType="primary-default"
            @click="closePopup()"
            />
        </div>
        <div v-else>
          <std-button @click="createSpace()" 
            class="save"
            title = "Create Space" 
            buttonType="primary-default"> 
          </std-button>
          <std-button @click="createSpacePopUp()"
            class="exit"
            title="Exit"
            buttonType="primary-default">
          </std-button> 
          
        </div>
      </form>
</template>
<script>

import StdButton from "@/components/StdButton.vue"

export default {
  name: 'space-popup',
  props:{
      spaceData: Object,
      floorData:Array,
      check: Boolean
  },

  components:{
    'std-button':StdButton
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

.exit{
  margin-left: 55%;
  margin-top: -8.3%;
}
.save{
  margin-left: 23%;
  margin-top: 5%;
}
.labels{
  margin-left:-45%;
}
.name{
  margin-left:-49%;
}
.flr{
  margin-left:-49.5%;
}
.det{
  margin-left:-48.5%;
}
.in_det{
  margin-left:2%;
  &:focus{
    padding: 2px;
    border: 4px solid rgb(0, 160, 160);
    border-radius: 8%;
  }
  &:hover{
    padding: 2px;
    border: 4px solid rgb(0, 160, 160);
    border-radius: 8%;
  }
}

.in_flr{
  margin-left:-59%;
  &:focus{
    padding: 2px;
    border: 4px solid rgb(0, 160, 160);
    border-radius: 8%;
  }
  &:hover {
    padding: 2px;
    border: 4px solid rgb(0, 160, 160);
    border-radius: 8%;
  }
}
.in_max{
  margin-left:-35%;
  &:focus{
    padding: 2px;
    border: 4px solid rgb(0, 160, 160);
    border-radius: 8%;
  }
  &:hover {
    padding: 2px;
    border: 4px solid rgb(0, 160, 160);
    border-radius: 8%;
  }
}

.in_name{
  margin-left:-36.5%;
  &:focus{
    padding: 2px;
    border: 4px solid rgb(0, 160, 160);
    border-radius: 8%;
  }
  &:hover {
    padding: 2px;
    border: 4px solid rgb(0, 160, 160);
    border-radius: 8%;
  }
}

</style>