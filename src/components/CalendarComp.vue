<template>
  <div class="spaceName">
    <b>Conference Room 1</b>
  </div>
  <div class="wrap">
    <div class="months">
      <DayPilotNavigator id="nav" :config="navigatorConfig" />
    </div>
    <div class="week">
      <DayPilotCalendar id="weekCal" :config="config" ref="calendar" />
    </div>
  </div>
</template>

<script>
import {DayPilotCalendar, DayPilotNavigator} from '@daypilot/daypilot-lite-vue'
import {initializeCalendar} from '/Users/lukenguyen/Desktop/2Barrels_Project/vue-frontend-jobscheduler/src/helpers.js'

export default {
  name: 'CalendarComp',
  data() {
    return{
      dayPiolotConfig: initializeCalendar()
    } 
  },
  props: {
  },
  components: {
    DayPilotCalendar,
    DayPilotNavigator
  },
  computed: {
    calendar() {
      return this.$refs.calendar.control
    }
  },
  methods: {
    loadEvents() {
      // placeholder for an HTTP call
      const events = [
        {
           id: 1,
           start: "2023-09-25T10:00:00",
           end: "2023-09-25T11:00:00",
           text: "Event 1",
           backColor: "#6aa84f",
           borderColor: "#38761d",
         },
         {
           id: 2,
           start: "2023-09-25T13:00:00",
           end: "2023-09-25T16:00:00",
           text: "Event 2",
           backColor: "#f1c232",
           borderColor: "#bf9000",
         },
         {
           id: 3,
           start: "2023-09-26T13:30:00",
           end: "2023-09-26T16:30:00",
           text: "Event 3",
           backColor: "#cc4125",
           borderColor: "#990000",
         },
         {
           id: 4,
           start: "2023-09-26T10:30:00",
           end: "2023-09-26T12:30:00",
           text: "Event 4"
         },
      ];
      this.calendar.update({events})
    },
  },
  async mounted() {
    await this.loadEvents()
  }
}
</script>

<style>
.spaceName {
  font-size: 43px
}
.wrap {
  display: flex
}

.months {
  margin-right: 10px
}

.week {
  flex-grow: 1
}

.calendar_default_event_inner {
  background: #2e78d6;
  color: white;
  border-radius: 5px;
  opacity: 0.9;
}
</style>