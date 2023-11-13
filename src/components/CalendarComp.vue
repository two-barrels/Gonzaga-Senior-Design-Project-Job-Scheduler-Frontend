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
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from '@daypilot/daypilot-lite-vue'
import http from '@/services/http-helper.js'
import date from '@/services/curr-date-helper.js'

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
          this.config.startDate = args.day;
        }
      },
      config: {
        viewType: "Week",
        startDate: date.currentDate(), // first week displayed
        durationBarVisible: false,
        timeRangeSelectedHandling: "Enabled",
        onTimeRangeSelected: async (args) => {
          const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
          const dp = args.control;
          dp.clearSelection();
          if (modal.canceled) {
            return;
          }
          dp.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result
          });
        },
        eventDeleteHandling: "Disabled",
        onEventMoved: () => {
          console.log("Event moved");
        },
        onEventResized: () => {
          console.log("Event resized");
        },
      },
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
    async loadEvents() {
      try {
        const events = []
        const response = await http.get('reservations')
        console.log(response.data)

        response?.data?.forEach((item, index) => {
          events.push({
            id: index,
            start: item?.start_time,
            end: item?.end_time,
            text: "Booked",
          })
        })
        this.calendar.update({events})
      } catch (error) {
        console.error('Error loading events:', error);
      }
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
  background: #f16d01;
  color: white;
  border-radius: 5px;
  opacity: 0.9;
}
</style>