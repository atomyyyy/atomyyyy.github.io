import { YoutubeDataClient } from './YoutubeDataClient.js';
import { EntriesMerger } from './EntriesMerger.js';
import { IcsGenerator } from './IcsGenerator.js';

const client = new YoutubeDataClient();
const result = await client.findAllUpcomingEvent();

const entriesMerger = new EntriesMerger();
const schedule = entriesMerger.loadNewData(Object.fromEntries(result));

const icsGenerator = new IcsGenerator(schedule);
icsGenerator.generate();