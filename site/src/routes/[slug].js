import client from '$lib/sanity';

const saleQuery = `
*[_type == "sale" && slug.current == $sale][0] {
  ...,
  "logo": logo.asset->url,
  "slug": slug.current
}
`;

export async function get({ params }) {
	const { slug } = params;

	const sale = await client.fetch(saleQuery, {
		sale: slug
	});

	const productsFetch = await fetch(`http://localhost:3000/api/${slug}?start=1`);

	const products = await productsFetch.json();

	if (sale) {
		return {
			body: { sale: sale, ...products }
		};
	}

	return {
		status: 404
	};
}
