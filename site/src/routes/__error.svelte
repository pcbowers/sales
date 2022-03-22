<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				status,
				message: error.message,
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let title;
</script>

<h1 class="mt-5 text-center font-bold text-5xl">This page does not exist</h1>
<div class="mt-5 text-sm text-center">{title}</div>
