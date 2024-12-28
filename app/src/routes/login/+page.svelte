<script lang="ts">
	import Button from '../../components/UI/Button.svelte';
	import InputText from '../../components/UI/InputText.svelte';

	import type { PageData } from './$types';
	import type { User } from '../../types';
	import { goto } from '$app/navigation';
	import { userState, login } from '../../user-state.svelte';

	let { data }: { data: PageData } = $props();

	let { email, password }: User = $state({
		email: '',
		password: ''
	});

	const OnLogin = async () => {
		try {
			
			await login(email, password);

			
		} catch (error) {
			console.error(error);
		}


	}

</script>

<div class="rounded w-1/2 bg-white relative p-4 shadow m-auto bg-white mt-4">
	<div class="text-center">
		<h2>Accedi</h2>

		<InputText 
            type="email" 
            className="w-full my-3"
            placeholder="email" 
            bind:value={email} 
        />
		<InputText
			type="password"
			className="w-full my-3"
			placeholder="Password"
			bind:value={password}
		/>
		<p>
			Non sono ancora registrato
			<a href="/register" class="text-blue-400">Registrati</a>
		</p>
		<Button className="bg-blue-400" onClickEvent={OnLogin}>Accedi</Button>
	</div>
</div>
