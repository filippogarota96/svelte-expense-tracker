<script lang="ts">
	let  { children, className, type = undefined, onClickEvent } = $props();
</script>

<button type={type} class="w-full my-5 text-white rounded p-2 {className}" onclick={onClickEvent}>
    {@render children()}
</button>
