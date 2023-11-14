// currently not being utilized

import {DayPilot} from '@daypilot/daypilot-lite-vue'

export default {
  initializeCalendarEvents() {
    return {
      events: []
    }
  },
  monthConfig(cf) {
    return {
      navigatorConfig: {
        showMonths: 2,
        skipMonths: 2,
        selectMode: "Week",
        startDate: "2023-09-26", //month first shown
        selectionDay: "2023-09-26", //week first highlighted
        onTimeRangeSelected: args => {
          //this.config.startDate = args.day;
          cf.startDate = args.day;
        }
      }
    }
  },
  weekConfig() {
    return {
      config: {
        viewType: "Week",
        startDate: "2023-09-26",
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
      }
    }
  }
}