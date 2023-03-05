import Config from '$lib/config.js';

export async function load(offset = 0) {
	const query = `
    query {
      posts(where: { offsetPagination: { size: 50, offset: ${offset} } }) {
        edges {
          node {
            id
            databaseId
            title
            slug
            uri
            date
            featuredImage {
              node {
                sourceUrl(size: THUMBNAIL)
              }
            }
          }
        }
      }
    }
  `;

	const data = await fetch(Config.GRAPHQL_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ query })
	});

	const result = await data.json();

	return {
		posts: result.data.posts.edges
	};
}
