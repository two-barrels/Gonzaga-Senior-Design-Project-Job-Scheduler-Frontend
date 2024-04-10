<template>
  <div class="spaceName">
    <b>{{ space_name }}</b>
  </div>
  <div v-if="loaded" class="wrap">
    <div class="months">
      <DayPilotNavigator id="nav" :config="navigatorConfig" />
      <button v-if="getIfUserAdmin" type="button" @click=blockTimes>Block Times</button>
    </div>
    <div class="week">
      <DayPilotCalendar id="weekCal" :config="config" ref="calendar" />
    </div>
  </div>
</template>

<script>
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from '@daypilot/daypilot-lite-vue'
import http from '@/services/http-helper.js'
import date from '@/services/curr-date-helper.js'

export default {
  name: 'CalendarComp',
  data() {
    return {
      events: [],
      loaded: false,
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
      config: this.initCalendar()
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
        const response = await http.get(`reservations/space/${this.space_id}`)
        
        response?.data?.forEach((item) => {
          this.events.push({
            id: item.id,
            start: item?.start_time,
            end: item?.end_time,
            text: item?.text,
            backColor: item.admin_block ? "#FF9700" : undefined
          })
        })
        this.calendar.update({ events: this.events })
      } catch (error) {
        console.error('Error loading events:', error)
      }
    },
    // adjustToLocal(time) {
    //   return new Date(time.getTime() + time.getTimezoneOffset() * 60000).toISOString().slice(0, 19)
    // },
    // adjustToUtc(time) {
    //   console.log(time.toISOString().slice(0, 19))
    //   return time.toISOString().slice(0, 19)
    // },
    async blockTimes() {
      const form = [
        {name: "Start Date/Time", id: "start", dateFormat: "M/d/yyyy", timeInterval: 30, type: "datetime"},
        {name: "End Date/Time", id: "end", dateFormat: "M/d/yyyy", timeInterval: 30, type: "datetime"}
      ]
      const blockRange = await DayPilot.Modal.form(form)

      this.events.push({
        start: blockRange.result["start"]["value"],
        end: blockRange.result["end"]["value"],
        id: DayPilot.guid(),
        text: "Blocked off by admin",
        backColor: "#FF9700"
      })
      try {
        await http.post(
          'reservations', {
            space_id: this.space_id, 
            start_time: blockRange.result["start"]["value"], 
            end_time: blockRange.result["end"]["value"],
            text: "Blocked off by admin",
            admin_block: true
          })
      } catch (error) {
        console.error('Error creating reservation:', error.message)
      }
      this.calendar.update({events: this.events})
    },

    overlapCheck(start, end) {
      return this.events.some((item) => {
        const existingStart = item.start.getTime()
        const existingEnd = item.end.getTime()
        return (start >= existingStart && start <= existingEnd) ||
            (end >= existingStart && end <= existingEnd)
      })
    },

    workingHrsCheck(start, end) {
      const startTime = start.slice(11, 13)
      const endTime = end.slice(11, 13)
      const startDay = new Date(start)
      const endDay = new Date(end)
      const workHrs = ['09', '10', '11', '12', '13', '14', '15', '16', '17']
      const workDays = [1, 2, 3, 4, 5]

      return (workHrs.includes(startTime) && workHrs.includes(endTime)) &&
          (workDays.includes(startDay.getDay()) && workDays.includes(endDay.getDay()))
    },

    pastCheck(start, end) {
      const currDateTime = new Date()
      return (start < currDateTime.getTime() || end < currDateTime.getTime())
    },

    initCalendar() {
      return {
        viewType: "Week",
        contextMenu: this.initContextMenu(),
        startDate: date.currentDate(), // first week displayed
        durationBarVisible: false,
        timeRangeSelectedHandling: "Enabled",
        onTimeRangeSelected: args => {
          this.handleTimeRangeSelected(args)
        },
        eventDeleteHandling: "Disabled",
        eventRightClickHandling: "ContextMenu",
        eventResizeHandling: "Disabled",
        eventMoveHandling: "Disabled",
      }
    },

    initContextMenu() {
      return new DayPilot.Menu([
        // //dev purposes
        // {
        //   text: "Show event ID",
        //   onClick: events => {
        //     console.log(events.source.data["start"])
        //   }
        // },
        {
          text: "Delete",
          onClick: events => {
            this.handleDelete(events)
          }
        },
        {
          text: "Edit",
          onClick: events => {
            this.handleEditEvent(events)
          }
        }
      ])
    },

    handleDelete(events) {
      try {
        http.delete(
          `reservations/${events.source.data["id"]}`, {
            space_id: this.space_id, 
            start_time: events.source.data["start"], 
            end_time: events.source.data["end"]
          }
        )
        this.events = this.events.filter(event => event.id !== events.source.data["id"]);
        this.calendar.update({ events: this.events });
      } catch (error) {
        console.error("Error deleting reservation:", error.message)
      }
    },

    async handleTimeRangeSelected(args) {
      const startTime = args.start.getTime()
      const endTime = args.end.getTime()

      if ((this.pastCheck(startTime, endTime))) {
        args.preventDefault()
        await DayPilot.Modal.alert("Error: Reservations cannot be made in the past.")
      }
      else if (!(this.workingHrsCheck(args.start['value'], args.end['value']))) {
        args.preventDefault()
        await DayPilot.Modal.alert("Error: Reservations cannot be made outside of working hours.")
        
      }
      else if (this.overlapCheck(startTime, endTime)) {
        args.preventDefault()
        await DayPilot.Modal.alert("Error: Your reservation overlaps with an exisiting reservation")
        
      }
      else {
        const resName = await DayPilot.Modal.prompt("Create a new reservation:", "Booked");
        const calendar = args.control;
        calendar.clearSelection();
        if (resName.canceled) {
          return
        } 
        calendar.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: resName.result
        })
        try {
          await http.post(
            'reservations', {
              space_id: this.space_id,  
              start_time: args.start, 
              end_time: args.end,
              text: resName.result,
              admin_block: false
            })
        } catch (error) {
          console.error('Error creating reservation:', error.message)
        }
      }
    },

    async handleEditEvent(events) {
      const form = [
        {name: "Start Date/Time", id: "start", dateFormat: "M/d/yyyy", timeInterval: 30, type: "datetime"},
        {name: "End Date/Time", id: "end", dateFormat: "M/d/yyyy", timeInterval: 30, type: "datetime"}
      ]

      const startTime = events.source.data['start']['value']
      const endTime = events.source.data['end']['value']

      const data = {
        start: startTime,
        end: endTime
      }
      const blockRange = await DayPilot.Modal.form(form, data)
      if (blockRange.canceled) {
        return
      } 

      this.events = this.events.filter(event => event.id !== events.source.data["id"]);
      this.events.push({
        start: blockRange.result["start"]["value"],
        end: blockRange.result["end"]["value"],
        id: DayPilot.guid(),
        text: events.source.data["text"]
      })

      try {
        await http.put(
          `reservations/${events.source.data["id"]}`, {
            space_id: this.space_id, 
            start_time: blockRange.result["start"]["value"], 
            end_time: blockRange.result["end"]["value"],
            text: events.source.data["text"],
            admin_block: false
          })
      } catch (error) {
        console.error('Error creating reservation:', error.message)
      }
      this.calendar.update({events: this.events})
    }
  },
  async mounted() {
    this.config = this.initCalendar()
    this.loaded = true
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
  color: red;
  border-radius: 5px;
  opacity: 0.9;
}
</style>