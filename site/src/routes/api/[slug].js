import client from '$lib/sanity';

const productQuery = (field = 'name', type = true) => `
*[_type == "product" && sale->slug.current == $sale && ([name, description, price] match $search || tags[].label match $search)][$start...$finish] | order(${field} ${
	type ? 'asc' : 'desc'
}) {
  ...,
  "images": images[].asset->url,
}
`;

const totalProductQuery = `
count(*[_type == "product" && sale->slug.current == $sale && ([name, description, price] match $search || tags[].label match $search)])
`;

const MAX = 100;

/** @type {import('./[slug]').RequestHandler} */
export async function get({ params, url }) {
	try {
		const { slug } = params;

		let start = Number(url.searchParams.get('start') || 0);
		const sort = url.searchParams.get('sort') || 'name';
		const asc = url.searchParams.get('asc') === 'true';
		const search = url.searchParams.get('search') || '';
		const pageSize = Math.min(MAX, Number(url.searchParams.get('pageSize') || MAX));

		if (start < 1) start = 1;

		const total = await client.fetch(totalProductQuery, {
			sale: slug,
			search: `*${search}*`
		});

		if (start > total) {
			if (total > pageSize) start = total - pageSize;
			else start = 1;
		}

		const products = await client.fetch(productQuery(sort, asc), {
			sale: slug,
			search: `*${search}*`,
			start: start - 1,
			finish: Math.min(total, start + pageSize)
		});

		return {
			body: {
				products,
				total,
				start: start,
				finish: start + products.length - 1,
				pageSize: Math.min(pageSize, products.length),
				maxPageSize: pageSize
			}
		};
	} catch (error) {
		return {
			status: 404
		};
	}
}
