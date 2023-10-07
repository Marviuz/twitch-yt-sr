<script lang="ts">
	import { onMount } from 'svelte';
	import YoutubePlayer from 'youtube-player';
	import PlayerStates from 'youtube-player/dist/constants/PlayerStates';
	import type { YouTubePlayer } from 'youtube-player/dist/types';

	let player: YouTubePlayer;
	let playerElem: Parameters<typeof YoutubePlayer>[0] | null = null;

	export let videoId: string;
	export let onVideoEnd: (event: CustomEvent & { data: number }) => void = () => {};

	onMount(() => createPlayer());

	function createPlayer() {
		if (!playerElem) return;

		player = YoutubePlayer(playerElem, {
			videoId,
			playerVars: {
				autoplay: 1
			}
		});

		player.on('stateChange', (evt) => {
			switch (evt.data) {
				case PlayerStates.ENDED:
					onVideoEnd(evt);
			}
		});

		return () => player.destroy();
	}
</script>

<div class="w-full h-full" bind:this={playerElem} />
