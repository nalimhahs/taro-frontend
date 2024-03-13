<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import type { WebSocketMessage } from '$lib/types/socket';

	const getProfileImageURL = (message: any): string => {
		return `https://cdn.discordapp.com/avatars/${message.d.data.author.id}/${message.d.data.author.profilePicture}.webp`;
	};

	export let message: WebSocketMessage;
</script>

<div class="flex py-2 pl-3">
	<div class="py-3 pr-3">
		<Avatar.Root>
			<Avatar.Image src={getProfileImageURL(message)} alt={message.d.data.author.userName} />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	</div>
	<div>
		<div class="pb-1 pt-2">
			<small class="text-sm font-medium leading-none">{message.d.data.author.userName}</small>
			<small class="pl-1 text-xs font-extralight leading-none text-muted-foreground"
				>{new Date(message.d.data.message.createdAt)}</small
			>
		</div>
		<p class="text-sm text-foreground">{message.d.data.message.messageContent}</p>
	</div>
</div>
