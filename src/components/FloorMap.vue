<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 400px"
  >
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />
    <ol-overlay
      :position="[37.9, 40.1]"
    >                                     
      <div class="overlay-content">
        {{ item }}
      </div>
    </ol-overlay>

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-polygon
            
            :coordinates="[
              [
                [10, 30],
                [30, 30],
                [30, 20],
                [10, 20]
              ]
            ]"
          ></ol-geom-polygon>
          <ol-style>
            <ol-style-stroke color="red" :width="2"></ol-style-stroke>
            <ol-style-fill color="rgba(255,0,0,0.2)"></ol-style-fill>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-polygon
            :coordinates="[
              [
                [30, 60],
                [50, 60],
                [50, 40],
                [30, 40]
              ]
            ]"
          ></ol-geom-polygon>
          <ol-style>
            <ol-style-stroke color="red" :width="2"></ol-style-stroke>
            <ol-style-fill color="rgba(255,0,0,0.2)"></ol-style-fill>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>

  </ol-map>
</template>

<script>
import { ref, reactive } from "vue"
export default{
  name: 'floor-map',
  data(){
    return{
      zoom: 2,
      rotation:0,
      center:0,
      item:"logo",
      projection:{}
    }
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
    }
    catch (error){
        console.error(error)
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