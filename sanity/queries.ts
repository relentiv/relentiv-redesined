import { groq } from 'next-sanity'

// Get all posts with author and category details
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    _updatedAt,
    title,
    slug,
    publishedAt,
    updatedAt,
    excerpt,
    body,
    mainImage {
      asset->,
      alt
    },
    author->{
      name,
      slug,
      image
    },
    categories[]->{
      title,
      slug
    }
  }
`

// Search posts by title, excerpt, body text, author, or category.
export const postsSearchQuery = groq`
  *[
    _type == "post" &&
    (
      title match $search ||
      excerpt match $search ||
      pt::text(body) match $search ||
      author->name match $search ||
      count((categories[]->title)[@ match $search]) > 0
    )
  ] | order(publishedAt desc) {
    _id,
    _updatedAt,
    title,
    slug,
    publishedAt,
    updatedAt,
    excerpt,
    body,
    mainImage {
      asset->,
      alt
    },
    author->{
      name,
      slug,
      image
    },
    categories[]->{
      title,
      slug
    }
  }
`

// Get a single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    slug,
    publishedAt,
    updatedAt,
    excerpt,
    mainImage {
      asset->,
      alt
    },
    body,
    author->{
      name,
      slug,
      image,
      bio
    },
    categories[]->{
      title,
      slug
    },
    seo
  }
`

// Get all post slugs (for static generation)
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`

// Get posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset->,
      alt
    },
    author->{
      name,
      slug
    }
  }
`
