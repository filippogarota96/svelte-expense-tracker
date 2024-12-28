
<script lang="ts">

    import { fade } from 'svelte/transition';
    
    let { expense } = $props();

    $inspect(expense);
</script>



<div transition:fade  class="bg-slate-100 p-3 my-5 rounded-lg cursor-pointer">
    <div class="flex justify-between">
        <div class="text-lg font-bold">{expense.title}</div>
        <div class="text-lg font-bold">€ {expense.amount}</div>
    </div>
    <div class="text-sm">{expense.tag}</div>
    
</div>