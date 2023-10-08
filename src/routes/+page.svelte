<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { FormNames, generateLinkSchema } from '$lib/utils/generate-link';
	import type { EventHandler } from 'svelte/elements';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import * as Tooltip from '$lib/components/ui/tooltip';

	let generatedLink = '';

	const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = (evt) => {
		const formData = new FormData(evt.currentTarget);
		const form = generateLinkSchema.safeParse(Object.fromEntries(formData.entries()));
		if (!form.success) throw new Error("It shouldn't go here! How'd you get here?!");

		const searchParams = new URLSearchParams(form.data);

		generatedLink = `${$page.url.origin}/overlay?${searchParams.toString()}`;
	};

	const handleCopyGeneratedLink = async () => {
		await navigator.clipboard.writeText(generatedLink);
		toast.push('Copied!');
	};
</script>

<main class="py-8">
	<div class="w-full max-w-sm px-2 mx-auto">
		<div class="space-y-8">
			<form on:submit|preventDefault={handleSubmit}>
				<div class="space-y-4">
					<label class="flex" for={FormNames.channelName}>
						<div class="flex items-center px-2 bg-secondary rounded-l-md">
							<span class="font-medium">twitch.tv/</span>
						</div>
						<Input
							id={FormNames.channelName}
							class="rounded-l-none"
							type="text"
							name={FormNames.channelName}
							required
							placeholder="YOUR CHANNEL NAME"
						/>
					</label>
					<Input type="text" name={FormNames.replier} placeholder="Custom replier" />
				</div>

				<Button class="w-full mt-6" type="submit">Generate link</Button>
			</form>

			{#if generatedLink}
				<div class="flex items-center gap-2 px-2 py-1 text-white rounded-md bg-accent">
					<code class="block truncate">
						{generatedLink}
					</code>
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								variant="outline"
								class="p-1 aspect-square"
								on:click={handleCopyGeneratedLink}
							>
								<Icon icon="bxs:copy" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Copy generated link</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</div>
			{/if}
		</div>
	</div>
</main>
