import { outputFile } from 'fs-extra';
import * as ics from 'ics'

const { error, value } = ics.createEvents([
  {
    title: 'Lunch',
    start: [2018, 1, 15, 12, 15],
    duration: { minutes: 45 }
  },
  {
    title: 'Dinner',
    start: [2018, 1, 15, 12, 15],
    duration: { hours: 1, minutes: 30 }
  }
], {
	productId: 'vtuber'
})

if (error) {
  console.log(error);
}

outputFile('calendar/vtuber.ics', value);