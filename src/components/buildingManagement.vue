<template>
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
                    :href="'#' + building.name">{{ building.name }}
                </a>
          </div>
        </div>
        <div class="col-8">
            <div class="tab-content tab-details" id="nav-tabContent">
                <div 
                    v-for="(building, idx) in buildings" 
                    :key="idx" class="tab-pane fade" 
                    :id="building.name" 
                    role="tabpanel" 
                    :aria-labelledby="'list-' + building.name"
                >
                    <floor-space :building="building" />
                </div>
            </div>
        </div>
      </div>
    </template>
    
    <script>
    import BuildingService from '@/services/building-service'
    import FloorSpace from '@/components/EditFloorSpace.vue'
  
    export default {
      name: 'builidng-management',
      components: {
        'floor-space': FloorSpace
      },
      data(){
        return{
          buildings: []
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
    </style>
    