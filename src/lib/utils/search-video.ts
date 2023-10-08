import ytdl from 'ytdl-core';
import ytsr from 'ytsr';
import { z } from 'zod';

const searchVideoSchema = z.object({
	query: z.string()
});

async function searchVideo(input: string): Promise<string> {
	if (ytdl.validateID(input)) return input;
	if (ytdl.validateURL(input)) return ytdl.getURLVideoID(input);

	const searchResults = await ytsr(input);
	const firstVideo = searchResults.items.at(0);
	if (firstVideo?.type === 'video') {
		return firstVideo.id;
	}

	throw new Error('Video not found!');
}

export { searchVideo, searchVideoSchema };
