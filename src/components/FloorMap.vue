<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 600px; border: 30px solid black;"
  >
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />
    <ol-vector-layer v-for="(spaces, index) in spaces_data" :key="index">
      <ol-source-vector>
        <ol-feature v-if="spaces.space_geometry">
          <ol-geom-polygon
            :coordinates="parseWKT(spaces.space_geometry.shape)"
          ></ol-geom-polygon>
          <ol-style>
            <ol-style-stroke color="black" :width="2"></ol-style-stroke>
            <ol-style-fill color="rgba(237, 231, 225)"></ol-style-fill>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>

<script>
import { ref, reactive } from "vue"
import http_helper from '@/services/http-helper'
import WKT from 'ol/format/WKT'
export default{
  name: 'floor-map',
  data(){
    return{
      zoom: 2,
      rotation:0,
      center:0,
      item:"logo",
      projection:{},
      spaces_data: []
    }
  },
  props:{
      floor_id: String
  },
  async mounted(){
    try{
      this.zoom = ref(2);
      this.rotation = ref(0);
      const size = ref([100, 100]);
      this.center = ref([size.value[0] / 2, size.value[1] / 2]);
      const extent = ref([0, 0, ...size.value]);
      this.item = ref('logo');
      this.projection = reactive({
        code: "xkcd-image",
        units: "pixels",
        extent: extent,
      })
      const spacesResponse= await http_helper.get(`spaces/get_floor/${this.floor_id}`)
      this.spaces_data = spacesResponse.data
      //console.log(this.spaces_data[0].space_geometry.shape)
      console.log(this.floor_id)
      console.log(this.spaces_data)
    }
    catch (error){
        console.error(error)
      }
    },
    methods:{
      parseWKT(wktString){
        const wktFormat = new WKT()
        const feature = wktFormat.readFeature(wktString)
        return feature.getGeometry().getCoordinates()
      }
    }
}

</script>

<style scoped>
.overlay-content {
  background: #efefef;
  box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  padding: 10px 20px;
  font-size: 16px;
  color: black;
}
</style>