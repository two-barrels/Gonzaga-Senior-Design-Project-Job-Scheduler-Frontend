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
            console.log(events.source.data["start"]["value"][11] + events.source.data["start"]["value"][12])
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
          //console.log(this.events)
          //DayPilot.Modal.alert("Cannot do this")
          // const start_time = parseInt(args.start["value"][11] + args.start["value"][12])
          // const end_time = parseInt(args.end["value"][11] + args.end["value"][12])

          // let existing_start = 0
          // let existing_end = 0
          // this.events.forEach(async (item) => {
          //   existing_start = parseInt(item.start["value"][11] + item.start["value"][12])
          //   existing_end = parseInt(item.end["value"][11] + item.end["value"][12])
          //   if (start_time >= existing_start && end_time <= existing_end) {
          //     args.preventDefault()
          //     await DayPilot.Modal.alert("Cannot do this")
          //     return
          //   }
          // })




          const modal = await DayPilot.Modal.prompt("Create a new event:", "Booked");
          const dp = args.control;
          dp.clearSelection();
          if (modal.canceled) {
            return
          }
          //if (parseInt(args.start["value"][11] + args.start["value"][12]))
          //const start_time = 
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
                    end_time: events.source.data["end"]
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
                        end_time: events.source.data["end"]
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
                    end_time: events.source.data["end"]
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
                        end_time: events.source.data["end"]
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
            text: "Booked"
          })
        })
        this.calendar.update({events: this.events})
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