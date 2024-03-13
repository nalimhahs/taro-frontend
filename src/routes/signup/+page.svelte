<script lang="ts">
	import SignupForm from '$lib/components/ui/signup-form/signup-form.svelte';
</script>

<div class="w-full max-w-[400px] flex-col items-center justify-center">
	<div class="mt-12 w-full p-4 text-center">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">Signup</h1>
	</div>
	<div>
		<SignupForm />
	</div>
	<div class="mt-10 text-center text-sm font-medium leading-none">
		Or <a class="font-bold underline" href="/login">Login</a>
	</div>
</div>
