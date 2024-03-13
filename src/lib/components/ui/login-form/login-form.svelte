<script lang="ts">
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { login } from '$lib/store/auth';
	import { formSchema } from './schema';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { typebox } from 'sveltekit-superforms/adapters';
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib/config';

	const apiUrl = API_URL + '/auth/signin';

	const form = superForm(defaults(typebox(formSchema)), {
		SPA: true,
		validators: typebox(formSchema),
		onUpdate: ({ form }) => {
			if (form.valid) {
				fetch(apiUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(form.data)
				}).then((res) =>
					res.json().then((data) => {
						if (res.status === 302) {
							login(data.token);
							goto('/');
						} else {
							toast.error(data.error);
						}
					})
				);
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field class="mt-4" {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field class="mt-3" {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} bind:value={$formData.password} type="password" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-4 w-full">Login</Form.Button>
</form>
