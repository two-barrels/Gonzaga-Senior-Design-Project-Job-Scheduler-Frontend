<template>
  <Toast position="top-center" group="tc"/>
  <Toast position="top-center" group="bc">
    <template #message>
      <div class ="warning">
        <p> Are you sure you want to remove {{popupBuildingHold.name }}?</p><br>
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
  <div class="row-buttons">
    <std-button
      @click="createBuildingPopUp()" 
      class="space-create-button"
      title = "Create Building" 
      buttonType="primary-default"
    />
  </div>
  <div class="row">
    <div class="col-4">
      <div 
        class="list-group overflow-auto" 
        style="max-height: 100vh;" 
        id="list-tab" 
        role="tablist"
      >
        <a 
          v-for="(building, idx) in buildings" 
          :key="idx" 
          class="list-group-item list-group-item-action" 
          :id="'list-' + building.name" 
          data-bs-toggle="list" 
          role="tab" 
          :aria-controls="'list-' + building.name" 
          :href="'#' + building.name"
        >
          {{ building.name }}
          <div class="row-buttons">
            <std-button
              @click="editBuildingPopUp(building, idx)" 
              class="space-create-button"
              title = "Edit Building" 
              buttonType="primary-default"
            />
            <std-button
              @click="createWarningToastBuilding(building)" 
              class="delete space-create-button"
              title = "Delete Building" 
              buttonType="alert-default"
            />
          </div>
        </a>
      </div>
    </div>
    <div class="col-8">
      <div class="tab-content tab-details" id="nav-tabContent" >
        <div 
          v-for="(building, idx) in buildings" 
          :key="idx" class="tab-pane fade" 
          :id="building.name" 
          role="tabpanel" 
          :aria-labelledby="'list-' + building.name"
        >
          <floor-space 
            :building="building" 
          />
        </div>
      </div>
    </div>
  </div>
  <div v-if="showBuildingPopup" class="popup"> 
    <building-popup
      :building="popupBuildingHold"
      :showEditPage="showEditBuildingPage"
      @save-building-changes="saveBuildingChanges"
      @create-building="createBuilding"
      @close-popup-building="closePopupBuilding"
    />
  </div>
</template>
    
<script>
import BuildingService from '@/services/building-service'
import FloorSpace from '@/components/EditFloorSpace.vue'
import StdButton from "@/components/StdButton.vue"
import _ from 'lodash'
import editBuildingPopUp from '@/components/EditBuildingPopUp'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

export default {
  name: 'builidng-management',
  components: {
    'floor-space': FloorSpace,
    StdButton,
    'building-popup': editBuildingPopUp,
    Toast
  },
  data(){
    return{
      toast: useToast(),
      buildings: [],
      showEditBuildingPage: true,
      popupBuilding: {},
      popupBuildingHold: {},
      dummyBuilding: {name: 'Building Name'},
      showBuildingPopup: false,
      buildingIdx: null
    }
  },
  async mounted(){
    try{
      const buildingResponse = await BuildingService.getAll()
      this.buildings = buildingResponse.data
      console.log(this.buildings)
    } catch (error){
        console.error(error)
    }
  },
  methods: {
    async createBuilding (buildingOutline) {
      this.popupBuilding = _.cloneDeep(buildingOutline)
      try {
        const response = await BuildingService.create(this.popupBuilding)
        this.popupBuilding.id = response.data.id
        this.buildings.push(this.popupBuilding)
        this.toast.add({severity:'success', summary: 'Changes saved successfully', life: 2000, group:'tc'})
        this.closePopupBuilding()
      } catch (e) {
        console.error(e)
        this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'tc'})
        this.closePopupBuilding()
      }
    },
    async saveBuildingChanges (buildingOutline) {
      this.popupBuildingHold = buildingOutline
      try {
        await BuildingService.save(this.popupBuildingHold.id, this.popupBuildingHold)
        this.buildings[this.buildingIdx] = this.popupBuildingHold
        this.toast.add({severity:'success', summary: 'Changes saved successfully', life: 2000, group:'tc'})
        this.closePopupBuilding()
      } catch (e) {
        console.error(e)
        this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'tc'})
        this.closePopupBuilding()
      }
    },
    async toggleWarnDelete () {
      this.popupBuilding = _.cloneDeep(this.popupBuildingHold)
      try {
        await BuildingService.delete(this.popupBuilding.id)
        this.buildings = this.floors.filter(item => item.id !== this.popupBuilding.id)
        this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
      } catch (e) {
        this.toast.add({severity:'error', summary:'Error saving changes. Remove spaces within first.', life:2000, group:'tc'})
      }
      this.toast.removeGroup('bc')
    },
    toggleWarnCancel () {
      this.toast.removeGroup('bc')
      this.visible = false
    },
    triggerToast (flag) {
      if (flag) { // if flag is true, success toast
        this.toast.add({severity:'success', summary: 'Changes saved successfully', life: 2000, group:'tc'})
      }
      else { //else, error toast
        this.toast.add({severity:'error', summary:'Error saving changes. Remove spaces within first.', life:2000, group:'tc'})
      }
    },
    createWarningToastBuilding (building) {
      this.popupBuildingHold = building
      this.toast.add({ severity: 'warn', summary: 'Delete', group: 'bc'})
    },
    createBuildingPopUp () {
      console.log(this.showBuildingPopup)
      this.showEditBuildingPage = false
      this.popupBuildingHold = _.cloneDeep(this.dummyBuilding)
      this.showBuildingPopup = !this.showBuildingPopup
      console.log(this.showBuildingPopup)
    },
    editBuildingPopUp (building, idx) {
      this.showEditBuildingPage = true
      this.buildingIdx = idx
      this.popupBuildingHold = _.cloneDeep(building)
      this.showBuildingPopup = !this.showBuildingPopup
    },
    closePopupBuilding () {
      this.popupBuildingHold = null
      this.buildingIdx = null
      this.showBuildingPopup = !this.showBuildingPopup
    }
  }
}
</script>
  
<style lang="scss" scoped>
  .floor-space-name {
    padding-left: 1%;
    padding-right: 1%;
  }
  .tab-details {
      min-height: 100vh;
  }
  .row-buttons{
    width: fit-content;
    height: fit-content;
    display: flex;
    margin: 15px;
  }
  .popup {
    width: 450px;
    height: fit-content;
    background-color: rgb(125, 175, 175);
    color: #fff;
    text-align: left;
    border-radius: 10px;
    padding: 10px;
    position: fixed;
    top: 0;
    z-index: 100;
    margin-right: 50%;
    margin-left: 37%;
  }
</style>
  