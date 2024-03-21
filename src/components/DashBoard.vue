<template>
    <h3 class="floor-space-name">
        Dashboard
    </h3>
    <div v-if="reservations_data.length == 0">
        <p>No events to display</p>
    </div>
    <div v-else class="reservation-div overflow-auto">
        <!-- <button @click="printReservations">Click me</button> -->
        <div v-for="(reservation, idx) in reservations_data" 
                    :key="idx" 
                    class="card" 
                    style="width: 50%; margin-left: 1%;">
            <div class="card-header">
                {{printDate(reservation.start_time)}}
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                <p><b>Space Name:</b> {{ reservation.space.spaces_name }} </p>
                <p><b>Location:</b> {{ reservation.space.floor.floor_name}}</p>
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
    data(){
        return {
            reservations_data: []
        }
    },
    computed: {
        reservationDate(){
            return true
        },
        reservationStartTime(){
            return true
        },
        reservationEndTime(){
            return true
        }
    },

    async mounted(){
      try{
        const reservationsResponse = await Reservations.get('dashboard')
        this.reservations_data = reservationsResponse.data
      } catch (error){
          console.error(error)
      }
    },
    methods: {
        printReservations(){
            console.log('printing')
            console.log(this.reservations_data)
        },
        printDate(dateString){
            const date = new Date(dateString) 
            return date.toLocaleDateString()
        },
        printTime(dateString){
            const date = new Date(dateString) 
            return date.toLocaleTimeString()
        }
    }
  }
  </script>
  
  <style lang="scss" scoped>
    .floor-space-name{
      margin-top: 15px;
      padding-left: 1%;
      padding-right: 1%;
    }
    .reservation-div{
        max-height: 75vh;
    } 
  </style>
  