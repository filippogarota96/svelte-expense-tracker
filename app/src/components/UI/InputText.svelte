<script lang="ts">
	interface InputProps {
		value: string | number | undefined;
		type: string;
		className?: string;
        placeholder: string;
	}

	let { value = $bindable('fallback'), type, className,  placeholder }: InputProps = $props();
</script>

<input
	{type}
	bind:value
	class="border p-2 bg-slate-100 outline-none focus:border-gray-700 text-gray-800 rounded {className}"
	{placeholder}
/>
