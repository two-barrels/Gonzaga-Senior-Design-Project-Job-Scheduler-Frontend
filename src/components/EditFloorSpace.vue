<template>
  <Toast position="top-center" group="bc">
    <template #message>
      <div class ="warning">
        <p> Are you sure you want to remove {{popupSpaceDataHold.spaces_name }}?</p><br>
        <div class="row-buttons">
          <std-button @click="toggleWarnDelete()" 
            class="space-create-button"
            title = "Confirm" 
            buttonType="primary-default"
          />
          <std-button @click = "toggleWarnCancel()"
            title = "Cancel" 
            buttonType="primary-default"
          /> 
        </div>
      </div>
    </template>
  </Toast>
  <Toast position="top-center" group="ac">
    <template #message>
      <div class ="warning">
        <p> Are you sure you want to remove {{popupFloorDataHold.floor_name }}?</p><br>
        <div class="row-buttons">
          <std-button @click="toggleWarnDeleteFloor()" 
            class="space-create-button"
            title = "Confirm" 
            buttonType="primary-default"
          />
          <std-button @click = "toggleWarnCancelFloor()"
            title = "Cancel" 
            buttonType="primary-default"
          /> 
        </div>
      </div>
    </template>
  </Toast>
  <Toast position="top-center" group="tc"></Toast>
    <div v-if="showPopup" class="popup"> 
        <SpacePopup :spaceData="popupSpaceDataHold" :floorData="floor_data" :showEditPage="showEditPage" 
          @save-changes="saveChanges" 
          @create-space="createSpace" 
          @close-popup="closePopup" 
          @create-space-pop-up="createSpacePopUp"> 
        </SpacePopup>
    </div>
    <div class="row-buttons">
      <std-button @click="createSpacePopUp()" 
        class="space-create-button"
        title = "Create Space" 
        buttonType="primary-default"
      />
      <std-button @click="createFloorPopUp()"
        title = "Create Floor" 
        buttonType="primary-default"
      />
    </div>
    <div v-if="showPopupFloor" class="popup"> 
      <FloorPopup :floorData= "popupFloorDataHold" :showEditPage="showEditPage" :buildingsData="buildings"
        @save-floor-changes="saveFloorChanges"
        @create-floor="createFloor"
        @close-popup-floor="closePopupFloor"> 
      </FloorPopup>
    </div>
    <div class = "drop-down">
      <vue-collapsible-panel-group>
      <vue-collapsible-panel :expanded="false" v-for="(val, idx) in floor_data" :key="idx" >
      <template #title>
        <div class="displayFloors">
          {{ val.floor_name }}
        </div>
        {{floorName}}
      </template>
      <template #content>
        <div class="row-buttons">
          <std-button @click="openFloorPopup(val, idx)"
            class="space-create-button"
            title="Edit Floor"
            buttonType="primary-default"
          />
          <std-button @click="createWarningToastFloor(val)"
            class="delete space-create-button"
            title="Delete Floor"
            buttonType="primary-default"
          />
        </div>
        <p> Click on a room or desk to edit </p>
        <div 
          class="spaces-buttons"
          v-for="(value, index) in val.spaces"
          :key="index"
        >
        <div v-if="val.id == value.floor_id" class="ind-floor">
          <div class = "space">
            <std-button @click="openPopup(value, index, idx)" 
              class="edit"
              title = "Edit" 
              buttonType="primary-default"
            />
            <std-button @click="createWarningToast(value)"
              class="delete space-create-button"
              title = "Delete" 
              buttonType="primary-default"
            />
            <h1> {{ value.spaces_name }}</h1>
            <p>Space Description: {{ value.description }}</p>
            <p>Max Occupancy: {{ value.max_occupancy }}</p>
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
  import _ from 'lodash'

  export default {
    name: 'edit-floor-space',
    data() {
      return { 
          dummySpace: { spaces_name: 'Room', floor_id: 1, max_occupancy: 1, description: "Description"},
          popupSpaceData: {},
          popupSpaceDataHold: {},
          spaces_data: [],
          floor_data: [],
          popupFloorData: {},
          popupFloorDataHold:{},
          dummyFloor: {floor_name: 'Floor', building_id: 1},
          buildings: [],
          floor_numbers:[],
          showPopup: false,
          showPopupFloor: false,
          toast:useToast(),
          visible:false,
          showEditPage: true,
          spaceIdx: null,
          floorIdx: null
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
        const floorPromise = http.get('floors')
        const buildings = await http.get('buildings')
        this.buildings = buildings.data
        
        const [spacesResponse, floorResponse] = await Promise.all([spacesPromise, floorPromise])
        this.floor_data = floorResponse.data
        this.spaces_data = spacesResponse.data
    
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
          this.popupSpaceData.id = response.data.id
          this.floor_data[this.popupSpaceData.floor_id].spaces.push(this.popupSpaceData)
          this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
        }
        catch(error){
          console.error(error)
        }
      },
      async createFloor(retFloorData){
        this.popupFloorData = retFloorData
        try{
          const response = await http.post('floors/', this.popupFloorData)
          this.popupFloorData.id = response.data.id
          this.floor_data.push(this.popupFloorData)
          this.toast.add({severity:'success', summary: 'Changes saved successfully', life: 2000, group:'tc'})
          this.closePopupFloor()
        }
        catch(error){
          console.error(error)
        }
      },
      createSpacePopUp(){
        this.showEditPage = false
        this.popupSpaceDataHold = _.cloneDeep(this.dummySpace)
        this.showPopup = !this.showPopup
      },   
      createFloorPopUp(){
        this.showEditPage =false
        this.popupFloorDataHold = _.cloneDeep(this.dummyFloor)
        this.showPopupFloor = !this.showPopupFloor
      }, 
      closePopup() {
        this.showEditPage = true
        this.spaceIdx = null
        this.popupSpaceDataHold = null
        this.showPopup = !this.showPopup
      },
      closePopupFloor() {
        this.showEditPage = true
        this.floorIdx = null
        this.popupFloorDataHold = null
        this.showPopupFloor = !this.showPopupFloor
      },
      openPopup(spaceData, idex, floorIdx) {
        this.showEditPage = true
        this.spaceIdx = idex
        this.floorIdx = floorIdx
        this.popupSpaceDataHold = _.cloneDeep(spaceData)
        this.showPopup = !this.showPopup
      },
      openFloorPopup(floorData, idx) {
        this.showEditPage = true
        this.floorIdx = idx
        this.popupFloorDataHold = _.cloneDeep(floorData)
        this.showPopupFloor = !this.showPopupFloor
      },
      saveChanges(retSpaceData){
        this.popupSpaceDataHold = retSpaceData
        http.put(`spaces/${this.popupSpaceDataHold.id}`, this.popupSpaceDataHold)
          .then(response => {
              console.log(response.data)
              this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
              this.floor_data[this.floorIdx].spaces[this.spaceIdx] = this.popupSpaceDataHold
              this.closePopup()
          })
          .catch(error => {
              console.error(error)
              this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'tc'})
          })
      },
      saveFloorChanges(retFloorData){
        this.popupFloorDataHold = retFloorData
        http.put(`floors/${this.popupFloorDataHold.id}`, this.popupFloorDataHold)
          .then(response=>{
            console.log(response.data)
            this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
            this.floor_data[this.floorIdx] = this.popupFloorDataHold
            this.closePopupFloor()
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
      checkSpacesinFloors(){
        for (let i =0; i < this.floor_data.length; i++){
          for (let j=0; j<this.floor_data[i].spaces.length; j++){
            return this.floor_data[i].spaces[j] !== this.popupSpaceData.id
          }
        }
      },
      toggleWarnDelete(){
        this.popupSpaceData = this.popupSpaceDataHold
        http.delete(`spaces/${this.popupSpaceData.id}`)
          .then(response => {
              console.log(response.data)
              this.floor_data = this.floor_data.filter(item => item.spaces !== this.popupSpaceData.id)
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
      },
      createWarningToastFloor(floorData) {
        this.popupFloorDataHold = floorData
        this.toast.add({ severity: 'warn', summary: 'Delete', group: 'ac'})
      },
      toggleWarnDeleteFloor(){
        this.popupFloorData = _.cloneDeep(this.popupFloorDataHold)
        http.delete(`floors/${this.popupFloorData.id}`)
          .then(response => {
              console.log(response.data);
              this.floor_data = this.floor_data.filter(item => item.id !== this.popupFloorData.id)
              this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
          })
          .catch(error => {
              console.error(error);
              this.toast.add({severity:'error', summary:'Error saving changes. Remove spaces within first.', life:2000, group:'tc'})
          })
        this.toast.removeGroup('ac')
      },
      toggleWarnCancelFloor(){
        this.toast.removeGroup('ac')
        this.visible = false;
      }
    }
  }
  </script>

  <style lang="scss" scoped>
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
.createFloor{
  margin-left: 5%;
  margin-top: -2.4%;
}
.createSpace{
  margin-right: 0%;
}
.cancelbutt{
  margin-left:50%;
  margin-top: -14.4%;
}

.drop-down{
    text-align: left;
    color: black;
    line-height: 32px;
    padding-left: 1%;
    padding-right: 1%;
  }
  .ind-floor{
    padding-bottom: 1%;
    background-color: $color-neutral--100;
    padding-left: 1%;
    outline: 1px $color-neutral--200 solid;
    border-radius: 5px;
    margin-top: 1%;
  }
  .row-buttons{
    width: fit-content;
    height: fit-content;
    display: flex;
    margin: 15px;
  }

  .space-create-button {
    margin-right: 15px;
  }
  .floor-space-name{
      padding-left: 1%;
      padding-right: 1%;
    }
  </style>

  