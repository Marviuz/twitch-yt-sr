<script lang="ts">
	import './styles.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<slot />
<SvelteToast options={{ duration: 1000 }} />
