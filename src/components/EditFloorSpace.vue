<template>
  <Toast position="top-center" group="bc">
    <template #message>
      <div class ="warning">
        <p> Are you sure you want to remove {{popupSpaceDataHold.spaces_name }}?</p><br>
        <button @click="toggleWarnDelete()"> Confirm </button>
        <button @click = "toggleWarnCancel()"> Cancel </button>
      </div>
    </template>
  </Toast>
  <Toast position="top-center" group="tc"></Toast>
    <div v-if="showPopup" class="popup"> 
        <h3> Edit Space </h3>
        <form>
          <label for="sname">Space Name:</label><br>
          <input type="text" class="sname" v-model="popupSpaceDataHold.spaces_name"><br>
          <label for="floor_num">Floor Name:</label><br>
          <select name="Floors">
          <option v-for="(val, idx) in floors_data" :key="idx" @click="changeFloor(val.floor_id)"> {{val.floor_id}}</option> 
          </select><br>
          <label for="max_num">Max Occupancy:</label><br>
          <input type="number" class="max_num" min="1" v-model="popupSpaceDataHold.max_occupancy"><br>
          <label>Space Details:</label><br>
          <textarea class="descript" rows="7" cols="50" v-model="popupSpaceDataHold.description"></textarea><bbr></bbr>
          <div v-if="check">
            <Button @click="saveChanges()" class ="editbuttsave" label = "Save" > Save </Button>
            <button @click="closePopup()"> Exit </button> 
          </div>
          <div v-else>
            <Button @click="createSpace(); createSpacePopUp()" class ="exitbuttsave" label = "Create Space" ></Button>
            <button @click="createSpacePopUp()"> Exit </button> 
          </div>
        </form>
    </div>
    <div class ="createSpace">
      <button @click="createSpacePopUp()"> Create Space </button>
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
          <div class = "space">
            <div class="edit">
                <button @click="openPopup(value, index)"> Edit </button> 
            </div> 
            <div class="delete">
                <Button @click="createWarningToast(value)" label = "Delete" ></Button>
            </div> 
            <h1> {{ value.spaces_name }}</h1>
            <p>Space Description: {{ value.description }}</p>
            <p>Max Occupancy: {{ value.max_occupancy }}</p>
            <hr> 
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
  import { useToast } from 'primevue/usetoast'
  import Button from 'primevue/button'
  import Toast from 'primevue/toast'
  import vClickOutside from 'v-click-outside'
  import http from '@/services/http-helper'
  
  export default {
    name: 'edit-floor-space',
    data() {
      return { 
          dummySpace: { spaces_name: 'Room', floor_id: 1, max_occupancy: 1, description: "Description"},
          popupSpaceData: {},
          popupSpaceDataHold: {},
          spaces_data: [],
          floors_data: [],
          floor_numbers:[],
          showPopup: false,
          toast:useToast(),
          visible:false,
          check: true,
          idx: null
      } 
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
        try{
          const spacesPromise = http.get('spaces')
          const floorsPromise = http.get('spaces/get_floors')
          const [spacesResponse, floorsResponse] = await Promise.all([spacesPromise, floorsPromise])
          this.spaces_data = spacesResponse.data
          this.floors_data = floorsResponse.data
        }
        catch(error){
          console.error(error)
        }
    },
    methods: {  
        async createSpace(){
          this.popupSpaceData = this.popupSpaceDataHold
          try{
            const response = await http.post('spaces/', this.popupSpaceData)
            console.log(response)
            this.popupSpaceData.id = response.data.id
            this.spaces_data.push(this.popupSpaceData)
            this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
            console.log(response.data.id)
          }
          catch(error){
            console.error(error)
          }
        },
        changeFloor(floorVal){
          console.log(floorVal)
          this.popupSpaceDataHold.floor_id = floorVal
        },
        createSpacePopUp(){
          this.check = false
          this.popupSpaceDataHold = JSON.parse(JSON.stringify(this.dummySpace))
          console.log(this.popupSpaceDataHold)
          this.showPopup = !this.showPopup
        },   
        closePopup() {
          this.check = true
          this.idx = null
          this.popupSpaceDataHold = null
          this.showPopup = !this.showPopup
        },
        openPopup(spaceData, idex) {
          this.check = true
          this.idx = idex
          this.popupSpaceDataHold = JSON.parse(JSON.stringify(spaceData))
          this.showPopup = !this.showPopup
        },
        saveChanges(){
          http.put(`spaces/${this.popupSpaceDataHold.id}`, this.popupSpaceDataHold)
            .then(response => {
                console.log(response.data)
                this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
                this.spaces_data[this.idx] = this.popupSpaceDataHold
                this.closePopup()
            })
            .catch(error => {
                console.error(error)
                this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'tc'})
            })
        },
        createWarningToast(spaceData) {
          this.popupSpaceDataHold = spaceData
          this.toast.add({ severity: 'warn', summary: 'Delete', group: 'bc'})
        },
        toggleWarnDelete(){
          this.popupSpaceData = this.popupSpaceDataHold
          console.log("Deleting space with id:", this.popupSpaceData.id)
          http.delete(`spaces/${this.popupSpaceData.id}`)
            .then(response => {
                console.log(response.data)
                this.spaces_data = this.spaces_data.filter(item => item.id !== this.popupSpaceData.id)
                this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
            })
            .catch(error => {
                console.error(error)
                this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'tc'})
            })
          this.toast.removeGroup('bc')
        },
        toggleWarnCancel(){
          this.toast.removeGroup('bc')
          this.visible = false
        }
    }
  }
  </script>

  <style scoped>
  #title, #content {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  button {
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
.popup {
    width: 600px;
    height: 600px;
    background-color: #d68e11;
    color: #fff;
    text-align: center;
    border-radius: 10px;
    padding: 8px 0;
    position: fixed;
    z-index: 100;
    margin-right: 50%;
    margin-left: 37%;
  }
.editbuttsave{
    margin-top: 20%;
  }
  </style>

  