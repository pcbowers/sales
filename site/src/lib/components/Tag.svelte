<script>
	export let tag;
	export let color;
	export let callback;
	export let selected = false;
</script>

<span
	on:click={() => callback(tag.value)}
	class={`font-medium rounded ${color} flex justify-center items-center transition-all px-3 gap-1 py-1 cursor-pointer  ${
		selected ? 'font-bold' : 'font-medium'
	}`}
>
	{#if selected}
		<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
				clip-rule="evenodd"
			/></svg
		>
	{:else}
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
				d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
			/></svg
		>
	{/if}
	{tag.label}
</span>
