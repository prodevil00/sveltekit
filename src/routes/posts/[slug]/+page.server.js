import { request, gql } from 'graphql-request';
import { redirect } from '@sveltejs/kit';
import Config from '$lib/config.js';

export const load = async ({ params, request: req }) => {
	const { slug } = params;

	const referer = req.headers.get('referer') || '';
	if (referer.includes('facebook.com') || slug.includes('fbclid')) {
		throw redirect(307, Config.REDIRECTED_URL + '/posts/' + slug);
	}

	const query = gql`
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

	const variables = { slug };

	const data = await request(Config.GRAPHQL_ENDPOINT, query, variables);

	return {
		props: {
			data,
			slug
		}
	};
};
