import { outputFile } from 'fs-extra';
import * as ics from 'ics'

class IcsGenerator {
	constructor(schedule) {
		this.schedule = schedule;
	}

	generate() {
		const { error, value } = ics.createEvents(
			this.schedule.map(live => {
				const scheduleStartTime = new Date(live.scheduledStartTime);
				return {
					start: [
						parseInt(live.scheduledStartTime.slice(0,4)),
						parseInt(live.scheduledStartTime.slice(5,7)),
						parseInt(live.scheduledStartTime.slice(8,10)),
						parseInt(live.scheduledStartTime.slice(11,13)),
						parseInt(live.scheduledStartTime.slice(14,16))
					],
					startInputType: 'utc',
					duration: { hours: 2, minutes: 0 },
					title: `[${live.channelTitle}] ${live.title}`,
					description: live.description,
					url: `https://www.youtube.com/watch?v=${live.videoId}`,
				}
			}),
			{
				productId: 'vtuber',
				calName: 'vtuber'
			}
		);

		if (error) {
			console.error(error);
			return;
		}

		outputFile('calendar/vtuber.ics', value);
	}
}

export { IcsGenerator };