<template>
  <Toast position="top-center" group="buildingSuccess"/>
  <Toast position="top-center" group="err"/>
  <Toast position="top-center" group="buildingWarn">
    <template #message>
      <div class ="warning">
        <p> Are you sure you want to remove {{ popupBuildingHold.name }}?</p><br>
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
          v-for="(building) in buildings" 
          :key="building.id" 
          class="list-group-item list-group-item-action" 
          :id="'list-' + building.buildingIdx" 
          data-bs-toggle="list" 
          role="tab"
          :aria-controls="'list-' + building.id" 
          :href="'#' + building.id"
        >
          {{ building.name }}
          <div class="row-buttons">
            <std-button
              @click="editBuildingPopUp(building, idx)" 
              class="space-create-button edit"
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
      <div class="tab-content tab-details" id="nav-tabContent">
        <div 
          v-for="(building) in buildings" 
          :key="building.id"
          class="tab-pane fade"
          :id="building.id"
          role="tabpanel"
          :aria-labelledby="'list-' + building.id"
        >
          <floor-space
            :building="building"
          />
        </div>
      </div>
    </div>
  </div>

  
  <div v-if="showBuildingPopup" class="popup"> 
    <edit-building-pop-up
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
import EditBuildingPopUp from '@/components/EditBuildingPopUp'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

export default {
  name: 'builidng-management',
  components: {
    FloorSpace,
    StdButton,
    EditBuildingPopUp,
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
        this.toast.add({severity:'success', summary: 'Changes saved successfully', life: 2000, group:'buildingSuccess'})
        this.closePopupBuilding()
      } catch (e) {
        console.error(e)
        this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'err'})
        this.closePopupBuilding()
      }
    },
    async saveBuildingChanges (buildingOutline) {
      this.popupBuildingHold = buildingOutline
      try {
        await BuildingService.save(this.popupBuildingHold.id, this.popupBuildingHold)
        this.buildings[this.buildingIdx] = this.popupBuildingHold
        this.toast.add({severity:'success', summary: 'Changes saved successfully', life: 2000, group:'buildingSuccess'})
        this.closePopupBuilding()
      } catch (e) {
        console.error(e)
        this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'err'})
        this.closePopupBuilding()
      }
    },
    async toggleWarnDelete () {
      this.popupBuilding = _.cloneDeep(this.popupBuildingHold)
      try {
        await BuildingService.delete(this.popupBuilding.id)
        this.buildings = this.buildings.filter(item => item.id !== this.popupBuilding.id)
        this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'buildingSuccess'})
      } catch (e) {
        this.toast.add({severity:'error', summary:'Error saving changes. Remove Floors within.', life:2000, group:'err'})
      }
      this.toast.removeGroup('buildingWarn')
    },
    toggleWarnCancel () {
      this.toast.removeGroup('buildingWarn')
      this.visible = false
    },
    createWarningToastBuilding (building) {
      this.popupBuildingHold = building
      this.toast.add({ severity: 'warn', summary: 'Delete', group: 'buildingWarn'})
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
  .build {
    display: flex;
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
  .row-buttons .edit{
    margin-right: 10px;
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
</style>
  