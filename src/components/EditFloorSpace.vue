<template>
  <Toast position="top-center" group="bc" @close="toggleWarnCancel()">
      <template #message>
        <div class ="warning">
          <p> Are you sure you want to remove this space? </p><br>
          <button @click="toggleWarnDelete(); createConfirmationToast()"> Confirm </button>
          <button @click = "toggleWarnDelete()"> Cancel </button>
        </div>
      </template>
    </Toast>
    <Toast position="top-center" group="tc"></Toast>
    <div v-if="showPopup" class="popup"> 
        <h3> Edit Space </h3>
          <form>
            <label for="sname">Space Name:</label><br>
            <input type="text" class="sname" v-model="popupSpaceData.spaces_name"><br>
            <label for="floor_num">Floor Name:</label><br>
            <select name="Floors">
            <option value="f1" v-for="(val, idx) in floors_data" :key="idx">{{val.floor_id}}</option>
            </select><br>
            <label for="max_num">Max Occupancy:</label><br>
            <input type="number" class="max_num" min="1" v-model="popupSpaceData.max_occupancy"><br>
            <label>Space Details:</label><br>
            <textarea class="descript" rows="7" cols="50" v-model="popupSpaceData.description"></textarea><bbr></bbr>
            <Button @click="createConfirmationToast(); saveChanges()" class ="editbuttsave" label = "Save" > Save </Button>
            <Button @click="createConfirmationToast(); togglePopup(); saveChanges()" class ="exitbuttsave" label = "Save and Exit" ></Button>
            <button v-on:click="togglePopup()"> Exit </button> 
          </form>
    </div>

    <div class = "floor">
      <vue-collapsible-panel-group>
    <vue-collapsible-panel :expanded="false" @Click="onGetInfo" v-for="(val, idx) in floors_data" :key="idx">
        <template #title>
          <div class="displayFloors">
            Floor {{ val.floor_id }}
          </div>
            {{floorName}}
        </template>
        <template #content>
            <p> Click on a room or desk to edit </p>
            <div 
              class="spaces-buttons"
              v-for="(value, index) in spaces_data"
              :key="index"
            >
              <div v-if="val.floor_id == value.floor_id">
                <div>
                    <div class = "space">
                      <div class="edit">
                          <button @click="togglePopup(value)"> Edit </button> 
                      </div> 
                      <div class="delete">
                          <Button @click="createWarningToast()" label = "Delete" ></Button>
                      </div> 
                      <h1> {{ value.spaces_name }}</h1>
                      <p>Space Description: {{ value.description }}</p>
                      <p>Max Occupancy: {{ value.max_occupancy }}</p>
                      <hr> 
                    </div>
                </div>
              </div>
            </div>
        </template>
    </vue-collapsible-panel>
</vue-collapsible-panel-group>
    </div>
  </template>
  
  <script>
  import {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
  } from '@dafcoe/vue-collapsible-panel'
  import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'
  import { useToast } from 'primevue/usetoast';
  import Button from 'primevue/button'
  import Toast from 'primevue/toast'
  import vClickOutside from 'v-click-outside'
  import http_helper from '@/services/http_helper'
 

  
  export default {
    name: 'edit-floor-space',
    data()
    {
      return{
          popupSpaceData: {},
          spaces_data: [],
          floors_data: [],
          floor_numbers:[],
          showPopup: false,
          toast:useToast(),
          visible:false
      };
        
    },
    directives: {
      clickOutside: vClickOutside.directive
    },
    props: {
      floorName: String
    }, 
    components: {
      VueCollapsiblePanelGroup,
      VueCollapsiblePanel,
      Button,
      Toast,
    },
    async mounted(){
        const spacesPromise = http_helper.get('spaces')
        const floorsPromise = http_helper.get('spaces/get_floors')
        const [spacesResponse, floorsResponse] = await Promise.all([spacesPromise, floorsPromise])
        if(spacesResponse.error) {
        throw Error
        }
        else {
          this.spaces_data = spacesResponse.data
        }
        if(floorsResponse.error){
          throw Error
        }
        else {
          this.floors_data = floorsResponse.data
        }
    },
    methods: {     
        togglePopup(spaceData) {
          this.popupSpaceData = spaceData;
          this.showPopup = !this.showPopup
        },
        saveChanges(){
          http_helper.put(`spaces/${this.popupSpaceData.id}`, this.popupSpaceData)
            .then(response => {
                // Handle success
                console.log(response.data);
                // Optionally close the popup or show a success message
                this.showPopup = false;
                this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'});
            })
            .catch(error => {
                // Handle error
                console.error(error);
                // Optionally show an error message
                this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'tc'});
            })
        },
        createConfirmationToast() {
          this.toast.add({severity:'success', summary:"Changes Saved Successfully", life:2000, group:'tc'}) // detail: 'Are you sure you want to remove this space?'
        },
        createWarningToast() {
          this.toast.add({ severity: 'warn', summary: 'Delete', group: 'bc'});
           
        },
        toggleWarnDelete(){
          this.toast.removeGroup('bc');
        },
        toggleWarnCancel(){
          this.toast.removeGroup('bc');
          this.visible = false;
        },
        onGetInfo(){
          console.log(this.spaces_data)
          console.log(this.floors_data)
        },

    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #title, #content {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
  }
  button{
  background-color: #c4870c; 
  color: white;
  padding: 15px 32px;
  text-align: center;
  border-radius: 15%;
  text-decoration: none;
  /* display: inline-block; */
  font-size: 16px;
  transition-duration: 0.4s;
    &::hover {
      background-color: green;
      color: white;
    }
  }

  /* Popup container - can be anything you want */
.space .edit {
  position: relative;
  float:right;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}


.space{
    border-bottom: 1px solid grey;
    margin-top: unset;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 5px;
}

.space .delete{
  position: relative;
  float: right;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* The actual popup */
.popup {
  width: 500px;
  height: 500px;
  background-color: #d68e11;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  padding: 8px 0;
  position: absolute;
  z-index: 100;
  margin-right: 50%;
  margin-left: 20%;
}

.editbuttsave{
  margin-top: 20%;
}

  </style>
  