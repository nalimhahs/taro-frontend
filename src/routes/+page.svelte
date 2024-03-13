<script lang="ts">
	import { tick } from 'svelte';

	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { authStore } from '$lib/store/auth';
	import { messageStore } from '$lib/store/socket';
	import type { DiscordChannel } from '$lib/types/discord';
	import ServerSelector from '$lib/components/ui/server-selector';
	import Message from '$lib/components/ui/message';
	import { StatusIndicator } from '$lib/components/ui/status-indicator';

	$: if (browser && !$authStore.isAuthenticated) {
		goto('/login');
	}
	$: messages = $messageStore;
	let element: HTMLElement;
	$: if (messages && element) {
		scrollToBottom(element);
	}

	const scrollToBottom = async (node: HTMLElement) => {
		await tick();
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	let isDialogeOpen = false;

	let selectedChannel: DiscordChannel | undefined;
	$: getChannelName = () => {
		if (selectedChannel?.id) {
			return '#' + selectedChannel.name;
		}
		return '› select channel ‹';
	};
</script>

{#if $authStore.isAuthenticated}
	<div class="mt-12 w-full p-4 text-left">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			Streaming:
			<button
				type="button"
				on:click={() => {
					isDialogeOpen = true;
				}}
				class="underline"
				aria-label="Select Channel"
			>
				{getChannelName()}
			</button>
			<ServerSelector bind:isDialogeOpen bind:selectedChannel />
		</h1>
	</div>
	<div class="relative mt-8 h-[60vh] w-full border-s-muted-foreground p-4">
		<StatusIndicator />
		<div
			class="flex h-full w-full flex-col-reverse overflow-auto rounded-md border bg-slate-100 p-4 dark:bg-slate-800"
			bind:this={element}
		>
			{#each messages as message}
				<Message {message} />
			{/each}
		</div>
	</div>
{/if}
