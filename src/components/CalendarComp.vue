<template>
  <Toast position="top-center" group="tc" />
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
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

export default {
  name: 'CalendarComp',
  data() {
    return {
      events: [],
      loaded: false,
      toast: useToast(),
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
    Toast,
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

    overlapCheck(start, end, id) {
      return this.events.some((item) => {
          const existingStart = item.start.getTime()
          const existingEnd = item.end.getTime()
          return item.id !== id && ((start >= existingStart && start < existingEnd) ||
              (end > existingStart && end <= existingEnd))
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
        // dev purposes
        // {
        //   text: "Show event ID",
        //   onClick: events => {
        //     console.log(events.source.data["id"])
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
      this.toast.add({severity:'success', summary:'Reservation deleted successfully', life:2000, group:'tc'})
    },

    async handleTimeRangeSelected(args) {
      const calendar = args.control
      const form = [
        {name: "Reservation name", id: "name", type: "text"},
        {name: "Start Date/Time", id: "start", dateFormat: "M/d/yyyy", timeInterval: 30, type: "datetime"},
        {name: "End Date/Time", id: "end", dateFormat: "M/d/yyyy", timeInterval: 30, type: "datetime"}
      ]
      const data = {
        start: args.start,
        end: args.end
      }

      if (this.pastCheck(args.start.getTime()), this.pastCheck(args.end.getTime())) {
        args.preventDefault()
        await DayPilot.Modal.alert("Error: Reservations cannot be made in the past.")
      }
      else if (!(this.workingHrsCheck(args.start['value'], args.end['value']))) {
        args.preventDefault()
        await DayPilot.Modal.alert("Error: Reservations cannot be made outside of working hours.")
      }
      else if ( this.overlapCheck(args.start.getTime(), args.end.getTime(), null)) {
        args.preventDefault()
        await DayPilot.Modal.alert("Error: Your reservation overlaps with an exisiting reservation")
      }
      else {
        calendar.clearSelection()
        const newRes = await DayPilot.Modal.form(form, data)

        if (newRes.canceled) {
          return
        } 
        else if ((this.pastCheck(newRes.result["start"].getTime(), newRes.result["end"].getTime()))) {
          args.preventDefault()
          await DayPilot.Modal.alert("Error: Reservations cannot be made in the past.")
        }
        else if (!(this.workingHrsCheck(newRes.result['start']['value'], newRes.result['end']['value']))) {
          args.preventDefault()
          await DayPilot.Modal.alert("Error: Reservations cannot be made outside of working hours.")
        }
        else if (newRes.result['start'].getTime() >= newRes.result['end'].getTime()) {
          await DayPilot.Modal.alert("Error: You entered an invalid range")
        }
        else if (this.overlapCheck(newRes.result["start"].getTime(), newRes.result["end"].getTime(), null)) {
          args.preventDefault()
          await DayPilot.Modal.alert("Error: Your reservation overlaps with an exisiting reservation")
        }
        else {
          try {
            const response = await http.post(
              'reservations', {
                space_id: this.space_id,  
                start_time: newRes.result["start"]["value"], 
                end_time: newRes.result["end"]["value"],
                text: newRes.result["name"],
                admin_block: false
              })
  
            calendar.events.add({
              start: newRes.result["start"]["value"],
              end: newRes.result["end"]["value"],
              id: response.data.id,
              text: newRes.result["name"]
            })
          } catch (error) {
          console.error('Error creating reservation:', error.message)
          }
          this.toast.add({severity:'success', summary:'Reservation created successfully', life:2000, group:'tc'})
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
      const newRange = await DayPilot.Modal.form(form, data)
      if (newRange.canceled) {
        return
      }
      else if ((this.pastCheck(newRange.result["start"].getTime(), newRange.result["end"].getTime()))) {
        await DayPilot.Modal.alert("Error: Reservations cannot be made in the past.")
      }
      else if (!(this.workingHrsCheck(newRange.result['start']['value'], newRange.result['end']['value']))) {
        await DayPilot.Modal.alert("Error: Reservations cannot be made outside of working hours.")
      }
      else if (newRange.result['start'].getTime() >= newRange.result['end'].getTime()) {
        await DayPilot.Modal.alert("Error: You entered an invalid range")
      }
      else if (this.overlapCheck(newRange.result["start"].getTime(), newRange.result["end"].getTime(), events.source.data["id"])) {
        await DayPilot.Modal.alert("Error: Your reservation overlaps with an exisiting reservation")
      }
      else {
        this.events = this.events.filter(event => event.id !== events.source.data["id"]);
        this.events.push({
          start: newRange.result["start"]["value"],
          end: newRange.result["end"]["value"],
          id: events.source.data["id"],
          text: events.source.data["text"]
        })
        try {
          await http.put(
            `reservations/${events.source.data["id"]}`, {
              space_id: this.space_id, 
              start_time: newRange.result["start"]["value"], 
              end_time: newRange.result["end"]["value"],
              text: events.source.data["text"],
              admin_block: false
            })
        } catch (error) {
          console.error('Error creating reservation:', error.message)
        }
        this.calendar.update({events: this.events})
        this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'})
      }
    }
  },
  async mounted() {
    this.config = this.initCalendar()
    this.loaded = true
    await this.loadEvents()
  }
}
</script>

<style lang=scss>
.modal_default_ok {
  width: fit-content ;
    padding: 14px 40px;
    color: white;
    background-color: $color-secondary--400;
    border-radius: 5px;
    &:hover {
        background-color: $color-secondary--800;
        cursor: pointer;
    }
}
.modal_default_cancel {
  width: fit-content;
    padding: 14px 40px;
    color: white;
    background-color: $color-danger--400;
    border-radius: 5px;
    &:hover {
        background-color: $color-danger--900;
        cursor: pointer;
    }
}

</style>

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

// .calendar_default_event_inner {
//   background: #f16d01;
//   color: red;
//   border-radius: 5px;
//   opacity: 0.9;
// }
</style>