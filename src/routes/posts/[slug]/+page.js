import { request, gql } from 'graphql-request';

export const load = async ({ params }) => {
	const { slug } = params;

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

	const data = await request('https://forever-love-animals.com/backend', query, variables);

	return {
		props: {
			data,
			slug
		}
	};
};
