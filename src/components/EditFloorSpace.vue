<template>
  <div class="row-buttons">
    <std-button
      @click="createSpacePopUp()" 
      class="space-create-button"
      title = "Create Space" 
      buttonType="primary-default"
    />
    <std-button
      @click="createFloorPopUp()"
      title = "Create Floor" 
      buttonType="primary-default"
    />
  </div>
  <Toast position="top-center" :group="warnToastName">
    <template #message>
      <div class ="warning">
        <p> Are you sure you want to remove {{popupSpaceDataHold.spaces_name }}?</p><br>
        <div class="row-buttons">
          <std-button @click="toggleWarnDelete()" 
            class="space-create-button"
            title = "Confirm" 
            buttonType="alert-default"
          />
          <std-button @click = "toggleWarnCancel()"
            title = "Cancel" 
            buttonType="primary-default"
          /> 
        </div>
      </div>
    </template>
  </Toast>
  <Toast position="top-center" :group="warnToastNameFloor">
    <template #message>
      <div class ="warning">
        <p> Are you sure you want to remove {{popupFloorDataHold.floor_name }}?</p><br>
        <div class="row-buttons">
          <std-button @click="toggleWarnDeleteFloor()" 
            class="space-create-button"
            title = "Delete" 
            buttonType="alert-default"
          />
          <std-button @click = "toggleWarnCancelFloor()"
            title = "Cancel" 
            buttonType="primary-default"
          /> 
        </div>
      </div>
    </template>
  </Toast>
  <Toast position="top-center" group="tc" />
  <div v-if="showPopup" class="popup"> 
    <space-popup
      :space-data="popupSpaceDataHold"
      :floor-data="floors"
      :show-edit-page="showEditPage"
      @save-changes="saveChanges"
      @create-space="createSpace"
      @close-popup="closePopup"
      @create-space-pop-up="createSpacePopUp"
    />
  </div>
  <div v-if="showPopupFloor" class="popup"> 
    <FloorPopup
      :floorData="popupFloorDataHold"
      :showEditPage="showEditPage"
      :buildingsData="buildings"
      @save-floor-changes="saveFloorChanges"
      @create-floor="createFloor"
      @close-popup-floor="closePopupFloor"
    />
  </div>
  <div class="drop-down">
    <vue-collapsible-panel-group>
      <vue-collapsible-panel :expanded="false" v-for="(val, idx) in floors" :key="idx" >
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
              buttonType="alert-default"
            />
          </div>
          <p> Click on a room or desk to edit </p>
          <div 
            class="spaces-buttons"
            v-for="(value, index) in val.spaces"
            :key="index"
          >
            <div
              v-if="val.id == value.floor_id"
              class="ind-floor"
            >
              <div class = "space">
                  <std-button
                    @click="openPopup(value, index, idx)" 
                    class="edit"
                    title = "Edit" 
                    buttonType="primary-default"
                  />
                  <std-button
                    @click="createWarningToast(value)"
                    class="delete space-create-button"
                    title = "Delete" 
                    buttonType="alert-default"
                  />
                <h1>{{ value.spaces_name }}</h1>
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
import SpacePopup from '@/components/EditSpacePopUp.vue'
import FloorPopup from '@/components/EditFloorPopUp.vue'
import StdButton from "@/components/StdButton.vue"
import _ from 'lodash'
import SpaceService from '@/services/space-service'
import FloorService from '@/services/floor-service'
import BuildingService from '@/services/building-service'

export default {
  name: 'EditFloorSpace',
  data() {
    return { 
        dummySpace: { spaces_name: 'Room', floor_id: 1, max_occupancy: 1, description: "Description"},
        popupSpaceData: {},
        popupSpaceDataHold: {},
        spaces_data: [],
        floors: [],
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
        floorIdx: null,
        loaded: false
    } 
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    building: Object,
    floorName: String
  }, 
  components: {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
    Toast,
    SpacePopup,
    FloorPopup,
    StdButton
  },
  computed: {
    warnToastName() {
      return `warnToast${this.building.id}`
    },
    warnToastNameFloor() {
      return `warnToastFloor${this.building.id}`
    }
  },
  async mounted(){
    if (this.building) {
      try{
        const spacesResponse = await SpaceService.getAll()
        const floorResponse = await FloorService.get(this.building.id)
        const buildingsResponse = await BuildingService.getAll()
        this.buildings = buildingsResponse.data
        this.floors = floorResponse.data
        this.spaces_data = spacesResponse.data
        this.loaded = true
      }
      catch (error) {
        console.error(error)
      }
    }
  },
  methods: {
    async createSpace(spaceOutline){
      this.popupSpaceData = _.cloneDeep(spaceOutline)
      try{
        const response = await SpaceService.create(this.popupSpaceData)
        this.popupSpaceData.id = response.data.id
        this.floors.find((floor) => floor.id === this.popupSpaceData.floor_id).spaces.push(this.popupSpaceData)
        this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
      }
      catch (error) {
        this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'tc'})
        console.error(error)
      }
    },
    async createFloor(floorOutline){
      this.popupFloorData = _.cloneDeep(floorOutline)
      try {
        const response = await FloorService.create(this.popupFloorData)
        this.popupFloorData.id = response.data.id
        this.popupFloorData.spaces = []
        this.floors.push(this.popupFloorData)
        console.log(this.floors)
        this.toast.add({severity:'success', summary: 'Changes saved successfully', life: 2000, group:'tc'})
        this.closePopupFloor()
      } catch (e) {
        this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'tc'})
        console.error(e)
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
    async saveChanges(spaceOutline){
      this.popupSpaceDataHold = spaceOutline
      try {
        await SpaceService.save(this.popupSpaceDataHold.id, this.popupSpaceDataHold)
        this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
        this.floors.forEach((floor) => floor.spaces = floor.spaces.filter(space => space.id !== this.popupSpaceDataHold.id))
        const floorOfSavedSpace = this.floors.find((floor) => floor.id === this.popupSpaceDataHold.floor_id)
        floorOfSavedSpace.spaces[this.spaceIdx] = this.popupSpaceDataHold
        this.closePopup()
      } catch (e) {
        console.error(e)
        this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'tc'})
      }
    },
    async saveFloorChanges(floorOutline){
      this.popupFloorDataHold = floorOutline
      try {
        await FloorService.save(this.popupFloorDataHold.id, this.popupFloorDataHold)
        this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
        this.floors[this.floorIdx] = this.popupFloorDataHold
        this.closePopupFloor()
      } catch (e) {
        console.error(e)
        this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'tc'})
      }
    },
    createWarningToast(spaceData) {
      this.popupSpaceDataHold = spaceData;
      this.toast.add({ severity: 'warn', summary: 'Delete', group: this.warnToastName})
    },
    async toggleWarnDelete(){
      this.popupSpaceData = this.popupSpaceDataHold
      try {
        await SpaceService.delete(this.popupSpaceData.id)
        const floorOfDeletedSpace = this.floors.find((floor) => floor.id === this.popupSpaceData.floor_id)
        floorOfDeletedSpace.spaces = floorOfDeletedSpace.spaces.filter(spaces => spaces.id !== this.popupSpaceData.id)
        this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
      } catch (e) {
        console.error(e)
        this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'tc'})
      }
      this.toast.removeGroup(this.warnToastName)
    },
    toggleWarnCancel(){
      this.toast.removeGroup(this.warnToastName)
      this.visible = false;
    },
    createWarningToastFloor(floorData) {
      this.popupFloorDataHold = floorData
      this.toast.add({ severity: 'warn', summary: 'Delete', group: this.warnToastNameFloor})
    },
    async toggleWarnDeleteFloor(){
      this.popupFloorData = _.cloneDeep(this.popupFloorDataHold)
      try {
        await FloorService.delete(this.popupFloorData.id)
        this.floors = this.floors.filter(item => item.id !== this.popupFloorData.id)
        this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
      } catch (e) {
        console.log(e)
        this.toast.add({severity:'error', summary:'Error saving changes. Remove spaces within first.', life:2000, group:'tc'})
      }
      this.toast.removeGroup(this.warnToastNameFloor)
    },
    toggleWarnCancelFloor(){
      this.toast.removeGroup(this.warnToastNameFloor)
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
    margin-top:10px;
    margin-right: 5px;
  }
.space{
    border-bottom: 1px solid grey;
    margin-top: unset;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 5px;
  }
.space .delete {
    position: relative;
    float: right;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-top:10px;
  }
.popup {
    width: fit-content;
    height: fit-content;
    background-color: rgb(125, 175, 175);
    color: #fff;
    text-align: left;
    border-radius: 10px;
    padding: 10px;
    position: fixed;
    top: 50%;
    z-index: 100;
    left: 50%;
    transform: translate(-50%, -50%);
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

  