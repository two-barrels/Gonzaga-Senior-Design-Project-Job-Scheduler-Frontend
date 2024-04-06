<template>
  <h3 class="floor-space-name">
      Dashboard
  </h3>
  <div v-if="reservations_data.length == 0">
    <p>No events to display</p>
  </div>
  <div v-else class="reservation-div overflow-auto">
    <button @click="printReservations">Click me</button>
    <div 
      v-for="(reservation, idx) in reservations_data"
      :key="idx"
      class="card"
    >
      <div class="card-header">
        {{printDate(reservation.start_time)}}
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
        <p><b>Space Name:</b> {{ reservation.space.spaces_name }} </p>
        <p><b>Location:</b> {{ this.floors_hash[reservation.space.floor_id] }}</p>
        <p><b>Start Time: </b> {{ printTime(reservation.start_time) }}</p>
        <p><b>End Time:</b> {{ printTime(reservation.end_time) }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Reservations from '@/services/dashboard-service'

export default {
  name: 'dash-board',
  components: {
  },
  computed: {
    floors_hash() {
      const hash = {};
      this.floors_data.forEach(floor => { hash[floor.id] = floor.floor_name })
      return hash
    }
  },
  data(){
    return {
      reservations_data: [],
      floors_data: []
    }
  },
  async mounted(){
    try{
      const reservationsResponse = await Reservations.get('dashboard')
      this.reservations_data = reservationsResponse.data
    } catch (error){
      console.error(error)
    }
    try{
      const floorsResponse = await Reservations.get('floors')
      this.floors_data = floorsResponse.data
    } catch (error){
      console.error(error)
    }
    
  },
  methods: {
    printDate(dateString){
      return new Date(dateString).toLocaleDateString()
    },
    printTime(dateString){
      return new Date(dateString).toLocaleTimeString()
    },
    printReservations(){
      console.log(this.floors_data)
      console.log(this.floors_hash)
    }
  }
}
</script>

<style lang="scss" scoped>
.floor-space-name {
  margin-top: 15px;
  padding-left: 1%;
  padding-right: 1%;
}

.reservation-div  {
  max-height: 75vh;
}

.card {
  width: 50%;
  margin-left: 1%;
}
</style>
  