<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1 class="text-5xl">{$page.status}: {$page.error?.message}</h1>
