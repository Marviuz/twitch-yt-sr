<script lang="ts">
	import YoutubePlayer from '@/components/YoutubePlayer.svelte';
	import { Commands } from '@/lib/commands';
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
		if (!query) return;

		switch (command) {
			case Commands.SR:
				const videoId = await trpc($page).searchVideo.query({ query });
				videos = [...videos, { id: nanoid(), src: videoId }];
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
		<div class="aspect-video w-full h-auto">
			<YoutubePlayer videoId={firstVid.src} onVideoEnd={() => removeLastPlayed()} />
		</div>
	{/key}
{/if}
