<template>
    <div class="scroll">
        <div v-if="showBuildingEditPopup">
            <h3> Edit Building</h3>
        </div>
        <div v-else>
            <h3> Create Buidling </h3>
        </div>
        <label class="name" for="sname">Building Name:</label><br>
        <input type="text" class="in_name" v-model="buildingHold.name"><br>
        <div v-if="showBuildingEditPopup" class="pairButtons">
            <std-button 
            class="save"
            @click="saveBuildingChanges()"
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
            <std-button @click="createBuilding()" 
            class="save"
            title = "Create"
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
    name: 'building-popup',
    components:{
        StdButton
    },
    props:{
        building: Object,
        showEditPage: Boolean
    },
    data(){
    return {
        showBuildingEditPopup: true,
        buildingHold: {}
    }
    },
    async mounted() {
        this.buildingHold = this.building
        this.showBuildingEditPopup = this.showEditPage
    },
    methods: {
    saveBuildingChanges() {
        this.$emit('save-building-changes', this.buildingHold)
    },
    createBuilding() {
        this.$emit('create-building', this.buildingHold)
    },
    closePopup() {
        this.$emit('close-popup-building')
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
    margin-right:5%;
  }
  .exit{
    display: inline;
  }
  .exit1{
    display: inline;
  }
  .pairButtons{
    margin-top:5%;
    display: flex;
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