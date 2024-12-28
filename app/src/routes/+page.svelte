<script lang="ts">
	import ExpenseItem from '../components/expense-item.svelte';
	import InputText from '../components/UI/InputText.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { userState } from '../store/user-state.svelte';
	import { ApiCall } from '../Axios';

	type Expense = {
		id: number;
		title: string;
		amount: number;
		tag: string;
	};

	let expenses: Expense[] = $state([]);

	let newExpense = $state({
		title: '',
		amount: 0,
		tag: ''
	});

	const addNewExpense = async () => {
		try {
			expenses = [
				...expenses,
				{
					id: expenses.length + 1,
					title: newExpense.title,
					amount: newExpense.amount,
					tag: newExpense.tag
				}
			];

			await fetch('http://localhost:3030/add-expense', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				body: JSON.stringify({
					title: newExpense.title,
					amount: newExpense.amount,
					tag: newExpense.tag
				})
			});
		} catch (error) {
			console.error(error);
		}
	};

	const fetchExpenses = async () => {
		try {

			const response = await ApiCall.get('/expenses');

			expenses = response.data;
			

		} catch (error) {
			console.error(error);
		}
	};

	$effect(() => {
		const userStorage = localStorage.getItem('user');

		const user = userStorage ? JSON.parse(userStorage) : null;

		if (!user.auth) {
			goto('/login');
		}
		
	});

	onMount(fetchExpenses);
</script>

<div class="rounded sm:w-[80%] lg:w-1/2 bg-white relative p-4 shadow m-auto bg-white mt-4">
	<div class="min-h-[400px]">
		{#each expenses as expense}
			<ExpenseItem {expense} />
		{/each}
		<div class="bg-blue-400 text-white"></div>
	</div>

	<div class="absolute bottom-0 left-5 right-5">
		<div class="grid grid-cols-6 gap-4">
			<InputText
				type="text"
				className="col-span-6"
				bind:value={newExpense.title}
				placeholder="Aggiungi il titolo"
			/>
			<InputText
				type="number"
				className="col-span-3"
				bind:value={newExpense.amount}
				placeholder="Aggiungi la spesa"
			/>
			<InputText
				type="text"
				className="col-span-3"
				bind:value={newExpense.tag}
				placeholder="Aggiungi un tag"
			/>
		</div>

		<button
			type="submit"
			class="w-full my-5 bg-blue-400 text-white rounded p-2"
			onclick={addNewExpense}>Aggiungi</button
		>
	</div>
</div>
