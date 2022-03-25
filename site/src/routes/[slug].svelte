<script>
	import Masonry from 'svelte-bricks';

	import { page } from '$app/stores';
	import { search } from '$lib/stores';
	import { onMount } from 'svelte';

	import Product from '$lib/components/Product.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Order from '$lib/components/Order.svelte';

	export let sale;
	export let products;
	export let meta;
	export let tags;

	onMount(() => search.set(''));

	let colors = [
		'bg-blue-100 text-blue-800 dark:bg-blue-200',
		'bg-gray-100 text-gray-800 dark:bg-gray-200',
		'bg-red-100 text-red-800 dark:bg-red-200',
		'bg-green-100 text-green-800 dark:bg-green-200',
		'bg-yellow-100 text-yellow-800 dark:bg-yellow-200',
		'bg-indigo-100 text-indigo-800 dark:bg-indigo-200',
		'bg-purple-100 text-purple-800 dark:bg-purple-200',
		'bg-pink-100 text-pink-800 dark:bg-pink-200'
	];

	let fields = ['name', 'price', 'description'];

	let selectedField = 'name';
	let direction = 'asc';

	let selectedTags = [];

	const paginate = async (start = 1) => {
		const data = await (
			await fetch(
				`${$page.url.origin}/api/${
					$page.params.slug
				}?start=${start}&sort=${selectedField}&direction=${direction}&tags=${selectedTags.join(
					'&tags='
				)}&${$search ? `&search=${$search}` : ''}`
			)
		).json();
		products = data.products.map((product) => ({ id: product._id, ...product }));
		meta.total = data.meta.total;
		meta.start = data.meta.start;
		meta.finish = data.meta.finish;
		meta.pageSize = data.meta.pageSize;
		meta.maxPageSize = data.meta.maxPageSize;
	};

	search.subscribe(async () => {
		await paginate(meta.start);
	});

	const updateTag = async (tagValue) => {
		if (selectedTags.includes(tagValue))
			selectedTags = selectedTags.filter((tag) => tag !== tagValue);
		else selectedTags = [...selectedTags, tagValue];

		console.log(selectedTags);
		await paginate();
	};

	const updateOrder = async (field) => {
		if (field === selectedField) {
			direction = direction === 'asc' ? 'desc' : 'asc';
		} else {
			selectedField = field;
		}

		await paginate();
	};
</script>

<svelte:head>
	<title>{sale.name}</title>
</svelte:head>

<div class="mt-5 max-w-5xl m-auto p-2">
	<div class="flex flex-col justify-center items-center mb-10">
		<h1 class="text-5xl font-bold text-center mb-10 max-w-xl">{sale.name}</h1>
		<div class="flex justify-center gap-2 mb-5">
			<a
				href={`mailto:${sale.email}`}
				rel="external"
				class="inline-flex items-center justify-center gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			>
				<svg
					class="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
						clip-rule="evenodd"
					/></svg
				>
				Email
			</a>
			{#if sale.phone}
				<a
					href={`tel:${sale.phone}`}
					rel="external"
					class="inline-flex items-center justify-center gap-1 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
				>
					<svg
						class="w-6 h-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
						/></svg
					>
					Phone
				</a>
			{/if}
		</div>
		<div class="text-lg font-mediuum text-center max-w-xl">
			{@html sale.description.replace(/\r?\n/g, '<br />')}
		</div>
	</div>

	{#if fields && fields.length}
		<div class="flex justify-center">
			<div class="flex flex-row justify-center max-w-xl items-center gap-2 mb-4 flex-wrap">
				{#each fields as field}
					<Order
						{field}
						color={colors[Math.floor(Math.random() * colors.length)]}
						callback={updateOrder}
						{direction}
						selected={field === selectedField}
					/>
				{/each}
			</div>
		</div>
	{/if}

	{#if tags && tags.length}
		<div class="flex justify-center">
			<div class="flex flex-row justify-center items-center gap-2 max-w-xl flex-wrap">
				{#each tags as tag}
					<Tag
						{tag}
						color={colors[Math.floor(Math.random() * colors.length)]}
						callback={updateTag}
						selected={selectedTags.includes(tag.value)}
					/>
				{/each}
			</div>
		</div>
	{/if}

	<div class="my-5 px-3">
		{#if products && products.length}
			<Pagination
				start={meta.start}
				finish={meta.finish}
				total={meta.total}
				pageSize={meta.pageSize}
				callback={paginate}
			/>

			<Masonry items={products} minColWidth={300} maxColWidth={400} gap={20} let:item>
				<Product product={item} currency={sale.currency} email={sale.email} saleName={sale.name} />
			</Masonry>

			<Pagination
				start={meta.start}
				finish={meta.finish}
				total={meta.total}
				pageSize={meta.pageSize}
				callback={paginate}
			/>
		{:else}
			<div class="text-center italic font-medium text-lg mt-2">No Products Found</div>
		{/if}
	</div>
</div>
