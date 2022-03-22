<script>
	import { search } from '$lib/stores';

	import '../app.css';
	import 'flowbite/dist/flowbite.css';
	import '@splidejs/splide/dist/css/splide.min.css';

	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<script>
		if (
			localStorage.getItem('color-theme') === 'dark' ||
			(!('color-theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.add('light');
		}
	</script>
</svelte:head>

<Navbar bind:search={$search} />

<slot />
