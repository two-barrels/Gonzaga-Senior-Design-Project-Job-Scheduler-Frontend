<template>
  <div>
    <vue-collapsible-panel-group>
      <div>
        <vue-collapsible-panel
          :expanded="false"
          v-for="(building, id) in buildings_data"
          :key="id"
        >
          <template #title>
            <div class="floor-title">{{ building.name }}</div>
          </template>
          <template #content>
            <div
              v-for="(floor, idx) in floors_data"
              :key="idx"
            >
              <div v-if="building.id == floor.building_id">
                <div>
                  <router-link to="/floor-map">
                    <std-button
                    title="Explore"
                    buttonType="primary-default"
                    >
                    </std-button>
                  </router-link>
                  {{ floor.floor_name }}
                </div>
              </div>
            </div>
          </template>
        </vue-collapsible-panel>
    </div>
    </vue-collapsible-panel-group>
  </div>
</template>

<script>
import {
   VueCollapsiblePanelGroup,
   VueCollapsiblePanel,
} from '@dafcoe/vue-collapsible-panel'
import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'
import http_helper from '@/services/http-helper'
import "@/store/index.js"
import StdButton from "@/components/StdButton.vue"


export default {
  name: 'building-space',
  data(){
    return{
      buildings_data: [],
      floors_data: []
    }
  },
  components: {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
    'std-button':StdButton
  },
  async mounted(){
    try{
      const floorsResponse= await http_helper.get('floors')
      this.floors_data = floorsResponse.data
      const buildingsResponse = await http_helper.get('buildings') 
      this.buildings_data = buildingsResponse.data
    } catch (error){
      console.error(error)
    }
  }
}
</script>