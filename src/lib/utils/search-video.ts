import { search, yt_validate, video_basic_info } from 'play-dl';
import { z } from 'zod';

const searchVideoSchema = z.object({
	query: z.string()
});

async function searchVideo(input: string): Promise<string> {
	if (input.startsWith('http') && yt_validate(input)) {
		const videoId = (await video_basic_info(input)).video_details.id;
		if (!videoId) throw new Error('No Video found');
	}

	const [ytVideo] = await search(input, {
		source: {
			youtube: 'video'
		}
	});

	if (!ytVideo?.id) throw new Error('No Video found');

	return ytVideo.id;
}

export { searchVideo, searchVideoSchema };
