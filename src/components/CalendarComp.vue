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
//import CalendarConfig from '@/service/calendar-config.js'

export default {
  name: 'CalendarComp',
  data() {
    return {
      events: [],
      navigatorConfig: {
        showMonths: 2,
        skipMonths: 2,
        selectMode: "Week",
        startDate: "2023-10-15", //month first shown
        selectionDay: "2023-10-15", //week first highlighted
        onTimeRangeSelected: args => {
          this.config.startDate = args.day;
        }
      },
      config: {
        viewType: "Week",
        startDate: "2023-10-15",
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
    loadEvents() {
      // placeholder for an HTTP call
      const events = [
        {
           id: 1,
           start: "2023-10-16T10:00:00",
           end: "2023-10-16T11:00:00",
           text: "Event 1",
           backColor: "#6aa84f",
           borderColor: "#38761d",
         },
         {
           id: 2,
           start: "2023-10-16T13:00:00",
           end: "2023-10-16T16:00:00",
           text: "Event 2",
           backColor: "#f1c232",
           borderColor: "#bf9000",
         },
         {
           id: 3,
           start: "2023-10-17T13:30:00",
           end: "2023-10-17T16:30:00",
           text: "Event 3",
           backColor: "#cc4125",
           borderColor: "#990000",
         },
         {
           id: 4,
           start: "2023-10-17T10:30:00",
           end: "2023-10-17T12:30:00",
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