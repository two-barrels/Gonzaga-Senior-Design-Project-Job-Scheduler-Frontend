<template>
  <div class="spaceName">
    <b>{{ space_name }}</b>
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
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from '@daypilot/daypilot-lite-vue'
import http from '@/services/http-helper.js'
import date from '@/services/curr-date-helper.js'
// import session from'@/SessionManager.vue'

export default {
  name: 'CalendarComp',
  data() {
    return {
      events: [],
      navigatorConfig: {
        showMonths: 2,
        skipMonths: 2,
        selectMode: "Week",
        startDate: date.currentDate(), //month first shown
        selectionDay: date.currentDate(), //week first highlighted
        onTimeRangeSelected: args => {
          this.config.startDate = args.day
        }
      },
      config: {
        viewType: "Week",
        contextMenu: new DayPilot.Menu([
        {
          text: "Show event ID",
          onClick: events => {
            console.log(events.source.data)
          }
        },
        {
          text: "Delete",
          onClick: events => {
            http.delete(
              `reservations/${events.source.data["id"]}`, {
                space_id: this.space_id, 
                user_id: 101, 
                start_time: events.source.data["start"], 
                end_time: events.source.data["end"]
              })
            location.reload()
          }
        }
        ]),
        startDate: date.currentDate(), // first week displayed
        durationBarVisible: false,
        timeRangeSelectedHandling: "Enabled",
        onTimeRangeSelected: async (args) => {
          const modal = await DayPilot.Modal.prompt("Create a new event:", "Booked");
          const dp = args.control;
          dp.clearSelection();
          if (modal.canceled) {
            return
          }
          dp.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result
          })
          try {
            await http.post(
              'reservations', {
                space_id: this.space_id, 
                user_id: 101, 
                start_time: args.start, 
                end_time: args.end
              })
            console.log('Reservation successfully created!')
          } catch (error) {
            console.error('Error creating reservation:', error.message)
          }
        },
        eventDeleteHandling: "Disabled",
        eventRightClickHandling: "ContextMenu",
        onEventMoved: () => {
          console.log("Event moved")
        },
        onEventResized: events => {
          http.put(
              `reservations/${events.source.data["id"]}`, {
                space_id: this.space_id, 
                user_id: 101, 
                start_time: events.source.data["start"], 
                end_time: events.source.data["end"]
              })
            location.reload()
          console.log("Event resized")
        },
      },
    }
  },
  props: {
    user_id: String,
    space_id: String,
    space_name: String
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
    async loadEvents() {
      try {
        const events = []
        const response = await http.get(`reservations/space/${this.space_id}`)
        console.log(this.user_id)
        
        response?.data?.forEach((item) => {
          events.push({
            id: item.id,
            start: item?.start_time,
            end: item?.end_time,
            text: "Booked"
          })
        })
        this.calendar.update({events})
      } catch (error) {
        console.error('Error loading events:', error)
      }
    },
  },
  async mounted() {
    await this.loadEvents()
  }
}
</script>

<style lang="scss" scoped>
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
  flex-grow: 1;
}

.calendar_default_event_inner {
  background: #f16d01;
  color: white;
  border-radius: 5px;
  opacity: 0.9;
}
</style>