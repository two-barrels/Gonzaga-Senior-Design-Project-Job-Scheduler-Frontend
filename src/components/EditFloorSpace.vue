<template>
  <Toast position="top-center" group="bc">
    <template #message>
      <div class ="warning">
        <p> Are you sure you want to remove {{popupSpaceDataHold.spaces_name }}?</p><br>
        <std-button @click="toggleWarnDelete()" 
          title = "Confirm" 
          buttonType="primary-default"> 
       </std-button>
        <std-button @click = "toggleWarnCancel()"
          title = "Cancel" 
          buttonType="primary-default"> 
       </std-button>
      </div>
    </template>
  </Toast>
  <Toast position="top-center" group="tc"></Toast>
    <div v-if="showPopup" class="popup"> 
        <SpacePopup :spaceData="popupSpaceDataHold" :floorData="floors_data" :check="check" 
          @save-changes="saveChanges" 
          @create-space="createSpace" 
          @close-popup="closePopup" 
          @create-space-pop-up="createSpacePopUp"> 
        </SpacePopup>
    </div>
    <div class ="createSpace">
      <std-button @click="createSpacePopUp()" 
          class="createSpace"
          title = "Create Space" 
          buttonType="primary-default"> 
      </std-button>
    </div>
    <div v-if="showPopupFloor" class="popup"> 
      <FloorPopup
          @close-popup="closePopupFloor"> 
      </FloorPopup>
    </div>
    <div class ="createFloor">
      <std-button @click="createFloorPopUp()" 
        class="createFloor"
        title = "Create Floor" 
        buttonType="primary-default"> 
      </std-button>
    </div>
    <div class = "floor">
      <vue-collapsible-panel-group>
      <vue-collapsible-panel :expanded="false" v-for="(val, idx) in floors_data" :key="idx">
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
              <std-button @click="openPopup(value, index)" 
                class="edit"
                title = "Edit" 
                buttonType="primary-default"> 
              </std-button>
            </div> 
            <div class="delete">
              <std-button @click="createWarningToast(value)"  
                class="delete"
                title = "Delete" 
                buttonType="primary-default"> 
              </std-button>
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
  import Toast from 'primevue/toast'
  import vClickOutside from 'v-click-outside'
  import http from '@/services/http-helper'
  import SpacePopup from '@/components/EditSpacePopUp.vue'
  import FloorPopup from '@/components/EditFloorPopUp.vue'
  import StdButton from "@/components/StdButton.vue"
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
          showPopupFloor: false,
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
      Toast,
      SpacePopup,
      FloorPopup,
      'std-button':StdButton
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
        async createSpace(retSpaceData){
          this.popupSpaceData = retSpaceData
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
        createSpacePopUp(){
          this.check = false
          this.popupSpaceDataHold = JSON.parse(JSON.stringify(this.dummySpace))
          console.log(this.popupSpaceDataHold)
          this.showPopup = !this.showPopup
        },   
        createFloorPopUp(){
          //this.check = false
          //this.popupSpaceDataHold = JSON.parse(JSON.stringify(this.dummySpace))
          //console.log(this.popupSpaceDataHold)
          this.showPopupFloor = !this.showPopupFloor
        }, 
        closePopup() {
          this.check = true
          this.idx = null
          this.popupSpaceDataHold = null
          this.showPopup = !this.showPopup
        },
        closePopupFloor() {
          //this.check = true
          this.showPopupFloor = !this.showPopupFloor
        },
        openPopup(spaceData, idex) {
          this.check = true
          this.idx = idex
          this.popupSpaceDataHold = JSON.parse(JSON.stringify(spaceData))
          this.showPopup = !this.showPopup
        },
        saveChanges(retSpaceData){
          this.popupSpaceDataHold = retSpaceData
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
          this.popupSpaceDataHold = spaceData;
          this.toast.add({ severity: 'warn', summary: 'Delete', group: 'bc'})
        },
        toggleWarnDelete(){
          this.popupSpaceData = this.popupSpaceDataHold
          console.log("Deleting space with id:", this.popupSpaceData.id)
          http.delete(`spaces/${this.popupSpaceData.id}`)
            .then(response => {
                console.log(response.data);
                this.spaces_data = this.spaces_data.filter(item => item.id !== this.popupSpaceData.id)
                this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
            })
            .catch(error => {
                console.error(error);
                this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'tc'})
            })
          this.toast.removeGroup('bc')
        },
        toggleWarnCancel(){
          this.toast.removeGroup('bc')
          this.visible = false;
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
    background-color: rgb(125, 175, 175);
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

  