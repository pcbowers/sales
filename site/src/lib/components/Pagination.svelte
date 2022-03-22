<script>
	export let total = 1;
	export let start = 1;
	export let finish = 10;
	export let pageSize = 20;
	export let maxPageSize = 20;
	export let callback;

	let totalProductText;
	let productText;
	let disablePrev = false;
	let disableNext = false;

	$: totalProductText = total === 1 ? 'Product' : 'Products';
	$: productText = pageSize === 1 ? 'Product' : 'Products';

	$: disablePrev = start === 1;
	$: disableNext = finish === total;
</script>

<div class="flex flex-col items-center">
	<span class="text-sm text-gray-700 dark:text-gray-400">
		Products <span class="font-semibold text-gray-900 dark:text-white">{start}</span>
		to
		<span class="font-semibold text-gray-900 dark:text-white">{finish}</span>
	</span>

	<span class="text-sm text-gray-700 dark:text-gray-400">
		Showing <span class="font-semibold text-gray-900 dark:text-white">{pageSize}</span>
		{productText} of
		<span class="font-semibold text-gray-900 dark:text-white">{total}</span>
		Total {totalProductText}
	</span>

	<div class="inline-flex mt-2 xs:mt-0">
		<button
			class="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
			disabled={disablePrev}
			on:click={() => callback(Math.max(start - maxPageSize, 1))}
		>
			<svg
				class="mr-2 w-5 h-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
					clip-rule="evenodd"
				/></svg
			>
			Prev
		</button>
		<button
			class="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
			disabled={disableNext}
			on:click={() => callback(finish + 1)}
		>
			Next
			<svg
				class="ml-2 w-5 h-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/></svg
			>
		</button>
	</div>
</div>
