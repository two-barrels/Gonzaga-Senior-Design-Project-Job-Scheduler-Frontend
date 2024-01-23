<template>
    <h3> Edit Floor Space </h3>
        
    <std-button 
        class="exit"
        title="Exit"
        buttonType="primary-default"
        @click="closePopup()"
        />
        
  </template>
  <script>
  
  import StdButton from "@/components/StdButton.vue"
  
  export default {
    name: 'floor-popup',
  
    components:{
      'std-button':StdButton
    },
    data(){
        return{
            checkA: true,
        }
    },
    methods:{
        closePopup() {
          this.$emit('close-popup')
        }
    }
  }
  </script>
  <style lang="scss">
  
  .exit{
    margin-left:40%;
    margin-top: 20.3%;
  }
  
  </style>