<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { isConnected } from '$lib/store/socket';
</script>

<div class="absolute right-9 top-9">
	{#if $isConnected === 1}
		<Badge class="bg-emerald-500 dark:bg-emerald-700" variant="success">Connected</Badge>
	{:else if $isConnected === 0}
		<Badge>Connecting</Badge>
	{:else}
		<Badge variant="destructive">Disconnected</Badge>
	{/if}
</div>
