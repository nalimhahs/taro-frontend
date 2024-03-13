<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	import { authStore } from '$lib/store/auth';
	import { joinRoom, leaveRoom } from '$lib/store/socket';

	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { DiscordChannel, DiscordServer } from '$lib/types/discord';
	import { API_URL } from '$lib/config';

	onMount(async () => {
		toast('Fetching Servers');
		servers = await fetch(API_URL + '/discord/servers', {
			headers: {
				Authorization: `Bearer ${$authStore.token}`
			}
		}).then((res) => res.json());
	});

	let servers: DiscordServer[] = [];
	let selectedServer: DiscordServer | undefined = {} as DiscordServer;

	let channels: DiscordChannel[];
	$: channels = selectedServer?.channels ?? [];

	export let selectedChannel: DiscordChannel | undefined;

	let selectedRoom: string = '';
	const handleJoinServer = async () => {
		if (!selectedServer?.id || !selectedChannel?.id) {
			return;
		}
		leaveRoom(selectedRoom);
		selectedRoom = selectedServer.id + '-' + selectedChannel.id;
		joinRoom(selectedRoom);
		toast.success('Joining Channel: #' + selectedChannel.name);
		isDialogeOpen = false;
	};
	export let isDialogeOpen: boolean;
</script>

<Dialog.Root open={isDialogeOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Join Channel</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Server</Label>
				<Select.Root
					items={servers.map((server) => ({ ...server, value: server.id, label: server.name }))}
					onSelectedChange={(v) => {
						selectedServer = servers.find((server) => server.id === v?.value);
					}}
				>
					<Select.Trigger class="w-[250px]">
						<Select.Value placeholder="Select Server" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each servers as server}
								<Select.Item value={server.id} label={server.name}>{server.name}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name="favoriteFruit" />
				</Select.Root>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="username" class="text-right">Channel</Label>
				<Select.Root
					items={channels.map((channel) => ({
						...channel,
						value: channel.id,
						label: channel.name
					}))}
					disabled={!selectedServer?.id}
					onSelectedChange={(v) => {
						selectedChannel = channels.find((channel) => channel.id === v?.value);
					}}
				>
					<Select.Trigger class="w-[250px]">
						<Select.Value placeholder="Select Channel" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each channels as channel}
								<Select.Item value={channel.id} label={channel.name}>#{channel.name}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name="channel" />
				</Select.Root>
			</div>
		</div>
		<Dialog.Footer>
			<Button on:click={handleJoinServer}>Join Channel</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
