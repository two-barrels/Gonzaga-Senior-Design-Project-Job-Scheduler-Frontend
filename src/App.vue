<template>
  <calendar-comp/>
  <available-spaces />
</template>

<script>
import CalendarComp from './components/CalendarComp.vue'
import AvailableSpaces from './components/AvailableSpaces.vue';


export default {
  name: 'App',
  components: {
    CalendarComp,
    AvailableSpaces
  }
}
</script>

<style>

</style>
