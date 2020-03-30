import Time from '@/libs/time.js';

export default {
	filters: {
		formatTime(timestamp) {
			return Time.gettime(timestamp);
		}
	},
}
