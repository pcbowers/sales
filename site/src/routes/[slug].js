import client from '$lib/sanity';

const saleQuery = `
*[_type == "sale" && slug.current == $sale][0] {
  ...,
  "logo": logo.asset->url,
  "slug": slug.current
}
`;

const tagQuery = `
*[_type == "product" && count(tags) > 0 && sale->slug.current == $sale].tags[]
`;

export async function get({ params, url }) {
	try {
		const { slug } = params;

		const sale = await client.fetch(saleQuery, {
			sale: slug
		});

		const productsFetch = await fetch(`${url.origin}/api/${slug}?start=1`);

		const products = await productsFetch.json();

		const tags = await client.fetch(tagQuery, {
			sale: slug
		});

		if (!sale) throw Error('This sale does not exist');

		return {
			status: 200,
			body: {
				sale: sale,
				...products,
				tags: tags.filter((value, index) => {
					const _value = JSON.stringify(value);
					return (
						index ===
						tags.findIndex((obj) => {
							return JSON.stringify(obj) === _value;
						})
					);
				})
			}
		};
	} catch (error) {
		return {
			status: 404
		};
	}
}
