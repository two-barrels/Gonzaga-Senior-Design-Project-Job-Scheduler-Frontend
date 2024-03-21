<template>
  <div class="spaceName">
    <b>{{ space_name }}</b>
  </div>
  <div class="wrap">
    <div class="months">
      <DayPilotNavigator id="nav" :config="navigatorConfig" />
      <button type="button" @click=blockTimes>Block Times</button>
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
            try {
              http.delete(
                `reservations/${events.source.data["id"]}`, {
                  space_id: this.space_id, 
                  user_id: 101, 
                  start_time: events.source.data["start"], 
                  end_time: events.source.data["end"]
                }
              )
              this.events = this.events.filter(event => event.id !== events.source.data["id"]);
              this.calendar.update({ events: this.events });
            } catch (error) {
              console.error("Error deleting reservation:", error.message)
            }
          }
        }
        ]),
        startDate: date.currentDate(), // first week displayed
        durationBarVisible: false,
        timeRangeSelectedHandling: "Enabled",
        onTimeRangeSelected: async (args) => {
          let overlap = false
          const start_time = args.start.getTime()
          const end_time = args.end.getTime()

          // checking for overlaps
          this.events.forEach(async (item) => {
            const existing_start = item.start.getTime()
            const existing_end = item.end.getTime()
            if ((start_time >= existing_start && start_time <= existing_end) ||
                (end_time >= existing_start && end_time <= existing_end)) {
              overlap = true
            }
          })
          if (overlap) {
            args.preventDefault()
            await DayPilot.Modal.alert("Cannot do this")
            return
          }
          else {
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
                  end_time: args.end,
                  text: modal.result // not working
                })
              console.log('Reservation successfully created!')
            } catch (error) {
              console.error('Error creating reservation:', error.message)
            }
          }
        },
        eventDeleteHandling: "Disabled",
        eventRightClickHandling: "ContextMenu",
        eventResizeHandling: "Update",
        onEventMoved: () => {
          console.log("Event moved")
          this.config.contextMenu = new DayPilot.Menu([
          {
            text: "Confirm move",
            onClick: events => {
              try {
                http.put(
                  `reservations/${events.source.data["id"]}`, {
                    space_id: this.space_id, 
                    user_id: 101, 
                    start_time: events.source.data["start"], 
                    end_time: events.source.data["end"],
                    text: events.source.data["text"]
                  }
                )
              } catch (error) {
                console.log("Error moving reservation:", error.message)
              }
              //reset context menu
              this.config.contextMenu = new DayPilot.Menu([
              {
                text: "Show event ID",
                onClick: events => {
                  console.log(events.source.data)
                }
              },
              {
                text: "Delete",
                onClick: events => {
                  try {
                    http.delete(
                      `reservations/${events.source.data["id"]}`, {
                        space_id: this.space_id, 
                        user_id: 101, 
                        start_time: events.source.data["start"], 
                        end_time: events.source.data["end"],
                        text: events.source.data["text"]
                      }
                    )
                    this.events = this.events.filter(event => event.id !== events.source.data["id"]);
                    this.calendar.update({ events: this.events });
                  } catch (error) {
                    console.log("Error deleting reservation:", error.message)
                  }
                }
              }
              ])
            }
          }
          ])
        },
        onEventResize: () => {
          console.log("event resized")
          this.config.contextMenu = new DayPilot.Menu([
          {
            text: "Confirm resize",
            onClick: events => {
              try {
                http.put(
                  `reservations/${events.source.data["id"]}`, {
                    space_id: this.space_id, 
                    user_id: 101, 
                    start_time: events.source.data["start"], 
                    end_time: events.source.data["end"],
                    text: events.source.data["text"]
                  }
                )
              } catch(error) {
                console.error('Error resizing reservation:', error.message)
              }
              // reset context menu
              this.config.contextMenu = new DayPilot.Menu([
              {
                text: "Show event ID",
                onClick: events => {
                  console.log(events.source.data)
                }
              },
              {
                text: "Delete",
                onClick: events => {
                  try {
                    http.delete(
                      `reservations/${events.source.data["id"]}`, {
                        space_id: this.space_id, 
                        user_id: 101, 
                        start_time: events.source.data["start"], 
                        end_time: events.source.data["end"],
                        text: events.source.data["text"]
                      }
                    )
                    this.events = this.events.filter(event => event.id !== events.source.data["id"]);
                    this.calendar.update({ events: this.events });
                  } catch (error) {
                    console.log("Error deleting reservation:", error.message)
                  }
                }
              }
              ])
            }
          }
          ])
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
        //const events = []
        const response = await http.get(`reservations/space/${this.space_id}`)
        console.log(this.user_id)
        
        response?.data?.forEach((item) => {
          this.events.push({
            id: item.id,
            start: item?.start_time,
            end: item?.end_time,
            text: item?.text
          })
        })
        this.calendar.update({events: this.events})
      } catch (error) {
        console.error('Error loading events:', error)
      }
    },
    async blockTimes() {
      const form = [
        {name: "Start Date/Time", id: "start", dateFormat: "M/d/yyyy", timeInterval: 30, type: "datetime"},
        {name: "End Date/Time", id: "end", dateFormat: "M/d/yyyy", timeInterval: 30, type: "datetime"}
      ]
      const blockRange = await DayPilot.Modal.form(form)
      console.log(blockRange.result["start"])

      this.events.push({
        start: blockRange.result["start"]["value"],
        end: blockRange.result["end"]["value"],
        id: DayPilot.guid(),
        text: "Blocked off by admin"
      })
      try {
        await http.post(
          'reservations', {
            space_id: this.space_id, 
            user_id: 101, 
            start_time: blockRange.result["start"]["value"], 
            end_time: blockRange.result["end"]["value"],
            text: "Booked"
          })
        console.log('Reservation successfully created!')
      } catch (error) {
        console.error('Error creating reservation:', error.message)
      }
      this.calendar.update({events: this.events})
    }
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
  //color: white;
  color: red;
  border-radius: 5px;
  opacity: 0.9;
}
</style>