import Config from '$lib/config.js';

const query = `
query{
  posts(where:{offsetPagination:{size:50, offset:0}}){
    edges{
      node{
        id
        databaseId
        title
        slug
        uri
        date
        featuredImage{
          node{
            sourceUrl(size:THUMBNAIL)
          }
        }
      }
    }
  }
}`;

export async function load() {
	const data = await fetch(Config.GRAPHQL_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ query })
	});

	const result = await data.json();

	return {
		props: {
			result
		}
	};
}
