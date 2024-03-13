<script lang="ts">
	import LoginForm from '$lib/components/ui/login-form/login-form.svelte';
</script>

<div class="w-full max-w-[400px] flex-col items-center justify-center">
	<div class="mt-12 w-full p-4 text-center">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">Login</h1>
	</div>
	<div>
		<LoginForm />
	</div>
	<div class="mt-10 text-center text-sm font-medium leading-none">
		Or <a class="font-bold underline" href="/signup">Signup</a>
	</div>
</div>
