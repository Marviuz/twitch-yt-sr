<script lang="ts">
	import YoutubePlayer from '$lib/components/YoutubePlayer.svelte';
	import { Commands } from '$lib/commands';
	import ComfyJS from 'comfy.js';
	import { nanoid } from 'nanoid';
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';
	import { error } from '@sveltejs/kit';

	const twitchChannel = $page.url.searchParams.get('channel');

	if (!twitchChannel)
		throw error(404, {
			message: 'Twitch channel not found!'
		});

	type Video = {
		src: string;
		id: string;
	};

	let videos: Video[] = [];
	$: firstVid = videos.at(0);

	ComfyJS.onCommand = async (_user, command, query) => {
		switch (command) {
			case Commands.SR:
				if (!query) break;
				const videoId = await trpc($page).searchVideo.query({ query });
				videos = [...videos, { id: nanoid(), src: videoId }];
				break;
			case Commands.SKIP:
				removeLastPlayed();
				break;
		}
	};

	ComfyJS.Init(twitchChannel);

	function removeLastPlayed() {
		const [_lastPlayed, ...vids] = videos;
		videos = vids;
	}
</script>

{#if firstVid}
	{#key firstVid.id}
		<div class="w-full h-auto aspect-video">
			<YoutubePlayer videoId={firstVid.src} onVideoEnd={() => removeLastPlayed()} />
		</div>
	{/key}
{/if}
