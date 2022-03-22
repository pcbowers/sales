import client from '$lib/sanity';

const productQuery = (field = 'name', direction = 'asc') => `
*[_type == "product" && totalPurchased != quantity && sale->slug.current == $sale && ([name, description, price] match $search || tags[].label match $search) && ($tag in tags[].value || $tag == '')]| order(${field} ${
	direction === 'desc' ? 'desc' : 'asc'
}) [$start...$finish] {
  ...,
  "images": images[].asset->url,
}
`;

const totalProductQuery = `
count(*[_type == "product" && totalPurchased != quantity && sale->slug.current == $sale && ([name, description, price] match $search || tags[].label match $search) && ($tag in tags[].value || $tag == '')])
`;

const MAX = 100;
const DEFAULT_SIZE = 20;

/** @type {import('./[slug]').RequestHandler} */
export async function get({ params, url }) {
	try {
		const { slug } = params;

		let start = Number(url.searchParams.get('start') || 0);
		const sort = url.searchParams.get('sort') || 'name';
		const direction = url.searchParams.get('direction') || 'asc';
		const search = url.searchParams.get('search') || '';
		const tag = url.searchParams.get('tag') || '';
		const pageSize = Math.min(MAX, Number(url.searchParams.get('pageSize') || DEFAULT_SIZE));

		if (start < 1) start = 1;

		const total = await client.fetch(totalProductQuery, {
			sale: slug,
			search: `*${search}*`,
			tag
		});

		if (start > total) {
			if (total > pageSize) start = total - pageSize;
			else start = 1;
		}

		const products = await client.fetch(productQuery(sort, direction), {
			sale: slug,
			search: `*${search}*`,
			tag,
			start: start - 1,
			finish: Math.min(total, start + pageSize - 1)
		});

		return {
			body: {
				products,
				meta: {
					total,
					start: start,
					finish: start + products.length - 1,
					pageSize: Math.min(pageSize, products.length),
					maxPageSize: pageSize
				}
			}
		};
	} catch (error) {
		return {
			status: 404
		};
	}
}
