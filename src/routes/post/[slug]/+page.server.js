import { redirect } from '@sveltejs/kit';
import Config from '$lib/config.js';

const query = `
  query getPost($slug: String!) {
    postBy(slug: $slug) {
      id
      content(format: RENDERED)
      title
      slug
      uri
      featuredImage {
        node {
          mediaItemUrl
          srcSet
          altText
        }
      }
      seo {
        title
        metaDesc
        canonical
        opengraphTitle
        opengraphSiteName
        opengraphDescription
        opengraphUrl
        opengraphType
        opengraphAuthor
        opengraphImage {
          mediaItemUrl
        }
        opengraphPublishedTime
        readingTime
      }
    }
  }
`;

export async function load({ params, request }) {
	const { slug } = params;

	const referer = request.headers.get('referer') || '';
	if (referer.includes('facebook.com') || slug.includes('fbclid')) {
		throw redirect(307, Config.REDIRECTED_URL + '/posts/' + slug);
	}

	const variables = { slug };
	const data = await fetch(Config.GRAPHQL_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ query, variables })
	});

	const result = await data.json();
	// console.log(result);

	return {
		props: {
			result
		}
	};
}
