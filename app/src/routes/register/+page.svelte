<script lang="ts">
	import Button from '../../components/UI/Button.svelte';
	import InputText from '../../components/UI/InputText.svelte';
	import type { ActionData, PageData } from './$types';
	import type { User } from '../../types';
	import { goto } from '$app/navigation';

	let { data, form }: { data: PageData, form: ActionData } = $props();

	let { name, email, password, confirmPassword }: User = $state({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

    const submitUser = async () => {
        try {
            console.log({ name, email, password, confirmPassword });

            const response = await fetch('http://localhost:3030/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, confirmPassword })
            });

            const data = await response.json();
            
			goto('/login');

        } catch (error) {
            console.log(error);
        }
    };


</script>

<div class="rounded w-1/2 bg-white relative p-4 shadow m-auto bg-white mt-4">
	
    <div class="text-center">

			<h2 class="text-2xl">Registrati</h2>

			<InputText
				type="text"
				className="w-full my-3"
				placeholder="Nome utente"
				bind:value={name}
			/>

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
			<InputText
				type="password"
				className="w-full my-3"
				placeholder="Conferma la password"
				bind:value={confirmPassword}
			/>
			<Button type="submit" className="bg-blue-400" onClickEvent={submitUser}>Registrati</Button>
	</div>
    
</div>
