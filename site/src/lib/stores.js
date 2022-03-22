import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const search = writable('');

function getTheme() {
	if (browser) {
		return localStorage.getItem('color-theme') === 'dark' ||
			(!('color-theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
			? 'dark'
			: 'light';
	}

	return 'light';
}
function createTheme() {
	const { subscribe, set, update } = writable(getTheme());

	return {
		subscribe,
		toggle: () => update((theme) => (theme === 'dark' ? 'light' : 'dark')),
		setDark: () => set('dark'),
		setLight: () => set('light')
	};
}

export const theme = createTheme();
