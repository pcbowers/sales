<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';

	export let product;
	export let currency;
	let cover = true;

	let options = {
		autoplay: true,
		interval: 3000,
		type: 'loop',
		speed: 800,
		start: 1,
		gap: '2rem',
		perMove: 1,
		arrows: true,
		keyboard: 'focus',
		pauseOnHover: true,
		waitForTransition: false,
		height: '15rem'
	};

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
</script>

<div class="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 m-auto">
	<div class="rounded-t-lg overflow-hidden mb-2 relative">
		<div
			class="absolute z-50 p-2 right-0 top-0 group cursor-pointer"
			on:click={() => (cover = !cover)}
		>
			<svg
				class="w-10 h-10 group-hover:w-12 group-hover:h-12 group-hover:opacity-90 transition-all opacity-60 dark:opacity-80"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
					clip-rule="evenodd"
				/></svg
			>
		</div>
		<Splide {options}>
			{#each product.images as image}
				<SplideSlide>
					<div class="w-full h-full flex justify-center items-center">
						<img
							src={image}
							alt="Product"
							class={`w-full h-full h-auto ${cover ? 'object-cover' : 'object-scale-down'}`}
						/>
					</div>
				</SplideSlide>
			{/each}
		</Splide>
	</div>
	<div class="px-5 pb-5">
		<h5 class="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
			{product.name}
		</h5>
		{#if product.tags}
			<div class="flex items-center gap-2 mt-2.5 mb-5">
				{#each product.tags as tag, index}
					<span
						class={`text-xs font-semibold px-2 py-0.5 rounded ${
							colors[Math.floor(Math.random() * colors.length)]
						}`}>{tag.label}</span
					>
				{/each}
			</div>
		{/if}
		{#if product.description}
			<p class="my-5">{product.description}</p>
		{:else}
			<p class="my-5">{product.name}</p>
		{/if}
		<div class="flex justify-between items-center">
			<span class="text-lg font-bold text-gray-900 dark:text-white"
				>{new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency
				}).format(product.price)}</span
			>
			<span class="dark:text-white text-gray-900 font-medium text-lg text-center "
				>{product.quantity - product.totalPurchased}/{product.quantity} Left</span
			>
		</div>
	</div>
</div>
