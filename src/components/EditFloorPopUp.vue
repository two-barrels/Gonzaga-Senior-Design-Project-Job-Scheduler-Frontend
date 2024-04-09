<template>
    <h3> Create Floor </h3>
    <std-button 
        class="exit2"
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
  .exit2{
    margin-left:40%;
    margin-top: 20.3%;
  }  
</style>