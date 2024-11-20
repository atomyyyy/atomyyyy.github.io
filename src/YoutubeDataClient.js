import axios from 'axios';

import { VTUBER_CHANNEL_MAPPING } from './VtuberChannelMapping.js';

class YoutubeDataClient {
	constructor() {
		this.liveStreamMap = new Map();
		this. commonParams = {
			regionCode: 'JP',
			maxResults: 100,
			resultPerPage: 100,
			key: process.env.YOUTUBE_API_KEY
		}

		this.defaultSearchParams = {
			...this.commonParams,
			part: 'snippet',
			eventType: 'upcoming',
			type: 'video',
		};

		this.defaultDetailParams = {
			...this.commonParams,
			part: 'liveStreamingDetails'
		}
	}

	async findAllUpcomingEvent() {
		await this.getLiveScheduleListByMultipleChannels();
		await this.getLiveDetails();

		return this.liveStreamMap;
	}

	async getLiveScheduleListByMultipleChannels() {
		await Promise.all(Object.values(VTUBER_CHANNEL_MAPPING).map(channelId => this.getLiveSchedule(channelId)));
	}

	async getLiveSchedule(channelId) {
		const result = await axios.get('https://www.googleapis.com/youtube/v3/search', { params: { ...this.defaultSearchParams, channelId } });
		if (!result.data) return;
		result.data.items.forEach(item => {
			this.liveStreamMap.set(
				item.id.videoId,
				item.snippet
			)			
		});
	}

	async getLiveDetails() {
		const videoIdList = [...this.liveStreamMap.keys()];
		const chunkedVideoIds = [];
		// Chunk Array by size of 10
		const chunkSize = 10;
		for (let i = 0; i < videoIdList.length; i += chunkSize) {
				const chunk = videoIdList.slice(i, i + chunkSize);
				chunkedVideoIds.push(chunk.join(','));
		}

		await Promise.all(chunkedVideoIds.map(videoIds => this.getLiveDetail(videoIds)));
	}

	async getLiveDetail(videoIds) {
		const result = await axios.get('https://www.googleapis.com/youtube/v3/videos', { params: { ...this.defaultDetailParams, id: videoIds } });
		console.log(result.data);
		if (!result.data) return;
		result.data.items.forEach(item => {
			this.liveStreamMap.set(
				item.id,
				{ ...this.liveStreamMap.get(item.id), ...item.liveStreamingDetails }
			)			
		});
	}
}

export { YoutubeDataClient };