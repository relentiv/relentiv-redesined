import { PortableTextBlock } from 'next-sanity'

export interface SanityImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface Author {
  _id: string
  name: string
  slug: {
    current: string
  }
  image?: SanityImage
  bio?: PortableTextBlock[]
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
}

export interface Post {
  _id: string
  _updatedAt?: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  updatedAt?: string
  excerpt?: string
  mainImage?: SanityImage
  body: PortableTextBlock[]
  author?: Author
  categories?: Category[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
}
