<script>
	export let field;
	export let color;
	export let selected;
	export let callback;
	export let direction = '';
</script>

<span
	on:click={() => callback(field)}
	class={`font-medium rounded ${color} flex justify-center items-center transition-all px-3 py-1 gap-1 cursor-pointer ${
		direction ? 'font-bold' : 'font-medium'
	}`}
>
	{#if !selected}
		<svg
			class="w-6 h-6"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
	{:else if direction === 'asc'}
		<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
				clip-rule="evenodd"
			/></svg
		>
	{:else}
		<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
				clip-rule="evenodd"
			/></svg
		>
	{/if}
	{field}
</span>
