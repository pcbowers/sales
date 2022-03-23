import client from '$lib/sanity';

const saleQuery = `
*[_type == "sale" && active == true && [slug.current, name, description, email, phone, currency] match $search][] {
  ...,
  "logo": logo.asset->url,
  "slug": slug.current
}
`;

export async function get({ url }) {
	try {
		const search = url.searchParams.get('search') || '';

		const sales = await client.fetch(saleQuery, {
			search: `*${search ? search : ''}*`
		});

		if (sales) {
			return {
				body: { sales }
			};
		}
	} catch (error) {
		return {
			status: 404
		};
	}
}
