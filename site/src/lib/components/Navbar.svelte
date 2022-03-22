<script>
	import { theme } from '$lib/stores';
	import { browser } from '$app/env';

	export let search;

	let timer;

	const debounce = (e) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			search = e.target.value;
		}, 100);
	};

	$: {
		if (browser) {
			document.documentElement.classList.add($theme);
			document.documentElement.classList.remove($theme === 'dark' ? 'light' : 'dark');
			localStorage.setItem('color-theme', $theme);
		}
	}
</script>

<nav
	class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600"
>
	<div class="container flex flex-wrap justify-end items-center mx-auto gap-2">
		<a href="/" rel="external" class="flex flex-1 items-center justify-start gap-2">
			<svg
				class="w-12 h-12 dark:text-white"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path
					fill-rule="evenodd"
					d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
					clip-rule="evenodd"
				/></svg
			>
			<span class="self-center text-xl font-bold whitespace-nowrap dark:text-white">SALES</span>
		</a>
		<div
			class="p-2 hover:bg-gray-100 md:order-3 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 text-sm text-gray-500 rounded-lg inline-flex items-center"
			on:click={() => theme.toggle()}
		>
			{#if $theme === 'dark'}
				<svg
					class="w-6 h-6 cursor-pointer"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg
				>
			{:else}
				<svg
					class="w-6 h-6 cursor-pointer"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
						clip-rule="evenodd"
					/></svg
				>
			{/if}
		</div>
		<div class="md:hidden flex md:order-3">
			<button
				data-collapse-toggle="mobile-menu"
				type="button"
				class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				aria-controls="mobile-menu"
				aria-expanded="false"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"
					/></svg
				>
				<svg
					class="hidden w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/></svg
				>
			</button>
		</div>
		<div
			class="hidden justify-between items-center w-full md:flex md:flex-1 md:max-w-md md:order-2"
			id="mobile-menu"
		>
			<ul
				class="flex flex-col w-full md:max-w-md md:flex-row md:space-x-0 md:text-sm md:font-medium"
			>
				<li class="w-full md:max-w-md">
					<div class="relative">
						<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
							<svg
								class="w-5 h-5 text-gray-500"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clip-rule="evenodd"
								/></svg
							>
						</div>
						<input
							type="text"
							id="search"
							on:input={debounce}
							class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search..."
						/>
					</div>
				</li>
			</ul>
		</div>
	</div>
</nav>
