<script>
	import '../app.css';
	import 'flowbite/dist/flowbite.css';

	import Navbar from '$lib/components/Navbar.svelte';

	let search;
</script>

<Navbar bind:search />

<slot />
