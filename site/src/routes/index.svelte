<script>
	import { page } from '$app/stores';
	import { search } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => search.set(''));

	import Sale from '$lib/components/Sale.svelte';
	export let sales;

	search.subscribe(async (value) => {
		sales = (
			await (
				await fetch(`${$page.url.origin}?search=${value}`, {
					headers: {
						'Content-Type': 'application/json',
						accept: 'application/json'
					}
				})
			).json()
		).sales;
	});
</script>

<svelte:head>
	<title>Sales</title>
</svelte:head>

<div class="mt-5 max-w-lg m-auto p-2">
	<h1 class="text-5xl font-bold text-center mb-5">Sales</h1>
	<div class="text-lg font-mediuum text-center mb-5">
		Browse all active sales below. Use the search bar above to filter.
	</div>
	{#if sales.length}
		{#each sales as sale}
			<Sale {sale} />
		{/each}
	{:else}
		<div class="text-center italic font-medium text-lg">No Sales Found</div>
	{/if}
</div>
