<template>
  <div v-if="loaded">
    <h3 class="floor-space-name">
        Home Page
        <button @click="printReservations">Click me</button>
    </h3>
    <div v-if="!areReservations">
      <p>No events to display</p>
    </div>
    <div v-else class="reservation-div overflow-auto">
      <div 
        v-for="(reservation, idx) in reservations_data"
        :key="idx"
        class="card"
      >
        <div class="card-header">
          <span>{{ reservation.text }}, {{printDate(reservation.start_time)}}</span>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
          <p><b>Space Name:</b> {{ reservation.space.spaces_name }} </p>
          <p><b>Location:</b> {{ this.floors_hash[reservation.space.floor_id] }}, Building {{ reservation.space.floor.building_id }}</p>
          <p><b>Start Time: </b> {{ printTime(reservation.start_time) }}</p>
          <p><b>End Time:</b> {{ printTime(reservation.end_time) }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Reservations from '@/services/dashboard-service'
import Buildings from '@/services/building-service'

export default {
  name: 'dash-board',
  components: {
  },
  computed: {
    floors_hash() {
      const hash = {};
      this.floors_data.forEach(floor => { hash[floor.id] = floor.floor_name })
      return hash
    },
    areReservations() {
      return this.reservations_data && this.reservations_data.length > 0
    },
  },
  data(){
    return {
      reservations_data: [],
      buildings: [],
      floors_data: [],
      loaded: false
    }
  },
  async mounted() {
    try {
      const reservationsResponse = await Reservations.get('dashboard')
      this.reservations_data = reservationsResponse.data
    } catch (error) {
      console.error(error)
    }
    try {
      const floorsResponse = await Reservations.get('floors')
      this.floors_data = floorsResponse.data
    } catch (error) {
      console.error(error)
    }
    try {
      const buildingsResponse = await Buildings.getAll()
      this.buildings = buildingsResponse.data
    } catch (error) {
      console.error(error)
    }
    console.log(this.reservations_data.length)
    this.loaded = true
  },
  methods: {
    printDate(dateString){
      return new Date(dateString).toLocaleDateString()
    },
    printTime(dateString){
      return new Date(dateString).toLocaleTimeString()
    },
    printReservations(){
      console.log(this.reservations_data)
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
  // display: flex;
}

.card {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
}
</style>
  