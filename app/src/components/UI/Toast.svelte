

<script lang="ts">

    type ToastSeverity =  {
        success: 'Success'
        error: 'Error';
        warning: 'Warning';
    }
    
    interface ToastProps {
        severity: string;
        message: string;
    }
    
    let {severity , message} : ToastProps = $props();

    let styles = $state({
        success: 'bg-green-400',
        error: 'bg-red-400',
        warning: 'bg-yellow-400'
    });

    let title : ToastSeverity = $state({
        success: 'Success',
        error: 'Error',
        warning: 'Warning'
    });


</script>


<div class="w-1/3 rounded p-3 absolute top-5 right-5 bg-yellow-400">
    <h2 class="text-2xl">{title[severity] || 'Inserire'}</h2>
    <p>{message}</p>
</div>