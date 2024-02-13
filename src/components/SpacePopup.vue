<template>
    <h3> Edit Space </h3>
        <form>
          <label for="sname">Space Name:</label><br>
          <input type="text" class="sname" v-model="spaceDataHold.spaces_name"><br>
          <label for="floor_num">Floor Name:</label><br>
          <select name="Floors">
          <option v-for="(val, idx) in floors_data" :key="idx" @click="changeFloor(val.floor_id)"> {{val.floor_id}}</option> 
          </select><br>
          <label for="max_num">Max Occupancy:</label><br>
          <input type="number" class="max_num" min="1" v-model="spaceDataHold.max_occupancy"><br>
          <label>Space Details:</label><br>
          <textarea class="descript" rows="7" cols="50" v-model="spaceDataHold.description"></textarea><bbr></bbr>
          <div v-if="check">
            <Button @click="saveChanges()" class ="editbuttsave" label = "Save" > Save </Button>
            <button @click="closePopup()"> Exit </button> 
          </div>
          <div v-else>
            <Button @click="createSpace();createSpacePopUp()" class ="exitbuttsave" label = "Create Space" ></Button>
            <button @click="createSpacePopUp()"> Exit </button> 
          </div>
        </form>
</template>
<script>
export default {
    name: 'space-popup',
    props:{
        spaceData: Object,
        floorName: String,
        floorData:Array,
        check: Boolean
    },
    data(){
        return{
            spaceDataHold: {}
        }
    },
    methods:{
        getCurrSpaceData(){
            this.spaceDataHold = this.spaceData
        },
        changeFloor(floorVal){
          this.spaceDataHold.floor_id = floorVal
        },
        saveChanges() {
        this.$emit('save-changes', this.spaceData);
        this.closePopup();
        },
        createSpaceAndPopup() {
        this.$emit('create-space', this.spaceData);
        this.closePopup();
        },
        closePopup() {
        this.$emit('close-popup');
        }
    }
}
</script>
<style lang="scss">

</style>