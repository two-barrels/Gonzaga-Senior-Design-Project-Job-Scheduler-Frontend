<template>
  <div class="scroll">
    <div v-if="showEditPage">
      <h3> Edit Space </h3>
    </div>
    <div v-else>
      <h3> Create Space </h3>
    </div>
      <label class="name" for="sname">Space Name:</label><br>
      <input type="text" class="in_name" v-model="spaceDataHold.spaces_name"><br>
      <label class="flr" for="floor_num">Floor Name:</label><br>
      <select v-model="spaceDataHold.floor_id" name="Floors" class="in_flr">
      <option v-for="floor in floorData" :key="floor.id" :value="floor.id"> {{floor.floor_name}}</option> 
      </select><br>
      <label class="labels" for="max_num">Max Occupancy:</label><br>
      <input type="number" class="in_max" min="1" v-model="spaceDataHold.max_occupancy"><br>
      <label class="det">Space Details:</label><br>
      <textarea class="in_det" rows="7" cols="50" v-model="spaceDataHold.description"></textarea><bbr></bbr>
      <div v-if="showEditPage" class="pairButtons">
        <std-button 
          class="save"
          @click="saveChanges()" 
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
      <div v-else class="pairButtons">
        <std-button
          @click="createSpace()"
          class="save"
          title = "Create Space" 
          buttonType="upsell-default"
        />
        <std-button 
          @click="createSpacePopUp()"
          class="exit"
          title="Cancel"
          buttonType="alert-default"
        /> 
      </div>
    </div>
</template>

<script>
import StdButton from "@/components/StdButton.vue"
import _ from 'lodash'

export default {
  name: 'SpacePopup',
  components: {
    StdButton
  },
  props: {
    spaceData: Object,
    floorData: Array,
    showEditPage: Boolean
  },
  data() {
    return{
      spaceDataHold: {
        floor_id: this.floorData[0].id
      }
    }
  },
  async mounted() {
    this.spaceDataHold = _.cloneDeep(this.spaceData)
    console.log(this.floorData)
  },
  methods: {
    changeFloor(floorVal) {
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
    createSpacePopUp() {
      this.$emit('create-space-pop-up')
    }
  }
}
</script>

<style lang="scss">
.scroll{
  overflow-x: hidden;
  overflow-y: auto;
}
.pairButtons{
  margin-top:5%;
  display: flex;
}
.save{
  margin-right:5%;
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
    padding: 2px;
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