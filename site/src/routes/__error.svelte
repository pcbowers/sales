<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				status,
				message: error.message
			}
		};
	}
</script>

<script>
	export let status;
	export let message;
</script>

<h1 class="mt-5 text-center font-bold text-5xl">{message}</h1>
<div class="mt-5 text-sm text-center">Error Code <strong>{status}</strong></div>
