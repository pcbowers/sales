<script>
	import { page } from '$app/stores';

	export let sale;
	export let products;
	export let total;
	export let start;
	export let finish;
	export let pageSize;
	export let maxPageSize;
</script>

<svelte:head>
	<title>{sale.name}</title>
</svelte:head>

<div class="max-w-xl m-auto">
	<div class="mb-5 font-mono"><strong>Slug</strong> {$page.params.slug}</div>
	<div class="mb-5 font-mono">
		<strong>Sale</strong>
		<pre class="overflow-auto max-w-full"><code>{JSON.stringify(sale, null, 2)}</code></pre>
	</div>
	<div class="mb-5 font-mono">
		<strong>Products</strong>
		<pre class="overflow-auto max-w-full"><code>{JSON.stringify(products, null, 2)}</code></pre>
	</div>
	<div class="mb-5 font-mono"><strong>Total</strong> {total}</div>
	<div class="mb-5 font-mono"><strong>Start</strong> {start}</div>
	<div class="mb-5 font-mono"><strong>Finish</strong> {finish}</div>
	<div class="mb-5 font-mono"><strong>Page Size</strong> {pageSize}</div>
	<div class="mb-5 font-mono"><strong>Max Page Size</strong> {maxPageSize}</div>
</div>
