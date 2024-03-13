<script>
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.pcss';
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-3xl flex-col items-center justify-center">
		<div class="flex w-full items-center justify-center p-4">
			<img src="/taro-icon.png" class="h-20" alt="Svelte logo" />
		</div>
		<slot />
	</div>
</div>
<Toaster />
