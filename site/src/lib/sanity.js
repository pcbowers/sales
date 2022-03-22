import sanityClient from '@sanity/client';

const client = sanityClient({
	projectId: 'dz7s4tsr',
	dataset: 'production',
	apiVersion: '2022-03-21',
	token: String(import.meta.env.VITE_SANITY_TOKEN || ''), // or leave blank for unauthenticated usage
	useCdn: true // `false` if you want to ensure fresh data
});

export default client;
