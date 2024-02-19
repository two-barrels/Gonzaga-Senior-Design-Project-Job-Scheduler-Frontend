<template>
  <div>
    <h2>{{ userName }}'s Role: </h2> 
    <std-button 
      title="Change Role"
      buttonType="primary-default"
    />
  </div>
  <br>
  <h3>Current Access to buildings/floors</h3>
  <p>Select building to view {{ userName }}'s access to floors and spaces</p>

  <vue-collapsible-panel-group class="drop-down">
    <vue-collapsible-panel
      :expanded="false"
    >
    <template #title>
      Building 1
    </template>
    <template #content>
      (list floors and spaces here for Building 1)
    </template>
    </vue-collapsible-panel>
    <vue-collapsible-panel
      :expanded="false"
    >
      <template #title>
        Building 2
      </template>
      <template #content>
        (list floors and spaces for Building 2)
      </template>
    </vue-collapsible-panel>
  </vue-collapsible-panel-group>

  <br>
  <std-button 
      title="Edit Building and Floor Access"
      buttonType="primary-default"
    />
</template>
<script>
  import StdButton from "@/components/StdButton.vue"
  import {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
  } from '@dafcoe/vue-collapsible-panel'
  import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'

  export default {
    name: 'user-permission',
    components: {
      VueCollapsiblePanelGroup,
      VueCollapsiblePanel,
      'std-button':StdButton
    },
    props: {
      userName: String,
      userId: String
    },
  }
  </script>
  
<style lang="scss" scoped>
.drop-down{
  width: 33%;
}
</style>
      