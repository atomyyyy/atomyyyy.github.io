import { readFileSync } from 'fs';
import { outputFile } from 'fs-extra';

class EntriesMerger {
	constructor() {
		this.root = 'data';
		this.retentionPeriod = 180;
		this.currentDate = new Date();
		this.calendar = JSON.parse(readFileSync(`${this.root}/calendar.json`));
	}

	loadNewData(newData) {
		// overwrite old records by video id
		const combinedData = { ...this.calendar, ...newData };
		const backupList = {};
		const newList = {};

		for (const [key, value] of Object.entries(combinedData)) {
			const liveStreamDate = new Date(value.scheduledStartTime);
			if (this.currentDate - liveStreamDate > (1000 * 60 * 60 * 24 * this.retentionPeriod)) {
				backupList[key] = value;
			} else {
				newList[key] = value;
			}
		}

		if (Object.keys(backupList).lengtth > 0) {
			outputFile(`${this.root}/legacy/${this.currentDate.toISOString()}.json`, Buffer.from(JSON.stringify(backupList)));
		}

		outputFile(`${this.root}/calendar.json`, Buffer.from(JSON.stringify(newList)));

		return Object.entries(newList).map(
			([key, value]) => ({ ...value, videoId: key})
		).sort((a,b) => new Date(a.scheduledStartTime) - new Date(b.scheduledStartTime));
	}
}

export { EntriesMerger };