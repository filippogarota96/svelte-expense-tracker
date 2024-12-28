<script lang="ts">
	import '../app.css';
	import Toast from '../components/UI/Toast.svelte';
	import  {toastState } from '../store/toast-state.svelte';

	let { children } = $props();
	
</script>

<div class="h-screen relative bg-slate-100 p-5">
	{@render children()}

	<Toast severity={toastState.severity} message={toastState.message} />

</div>


<style>
	
</style>