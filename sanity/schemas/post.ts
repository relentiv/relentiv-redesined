import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'Optional SEO settings',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Blog title',
      type: 'string',
      description: 'This is the big headline readers see on the website.',
      placeholder: 'Example: How to choose the right tech stack for a new product',
      validation: (Rule) => Rule.required().min(8).warning('Use a clear, specific title.'),
    }),
    defineField({
      name: 'slug',
      title: 'Page URL',
      type: 'slug',
      description: 'Click Generate after entering the title. This becomes the blog page link.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      description: 'Choose who wrote the post. Create an Author first if the name is missing.',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover image',
      type: 'image',
      description: 'Upload the main image for the blog card and article header. Wide images work best.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Image description',
          description: 'Describe the image for accessibility.',
          placeholder: 'Example: Team reviewing product wireframes on a laptop',
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Topics',
      type: 'array',
      description: 'Pick one or two topics so readers can understand the post category.',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      type: 'datetime',
      description: 'The date shown on the blog. Use today unless you are backdating a post.',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated date',
      type: 'datetime',
      description: 'Optional. Use this when an article has been substantially updated after publishing.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Short summary',
      type: 'text',
      description: 'One or two sentences shown on the blog card before readers open the post.',
      placeholder: 'Example: A practical guide to making early technical decisions without slowing the product team.',
      rows: 4,
      validation: (Rule) => Rule.max(220).warning('Keep this short so the blog cards stay clean.'),
    }),
    defineField({
      name: 'body',
      title: 'Article content',
      type: 'array',
      description: 'Write the full blog here. Use headings to break long posts into sections.',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Image description',
              description: 'Describe what is visible in this image.',
              placeholder: 'Example: Screenshot of the dashboard analytics page',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      description: 'Optional. Leave this empty unless you want custom Google/social text.',
      fieldset: 'seo',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Google title',
          description: 'Optional title for search engines. If empty, the blog title is used.',
          placeholder: 'Example: Choosing the Right Tech Stack | Relentiv',
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Google description',
          description: 'Optional search result description. If empty, the short summary is used.',
          placeholder: 'Example: Learn how founders can choose a practical tech stack for fast, reliable product delivery.',
          rows: 3,
          validation: (Rule) => Rule.max(160).warning('Keep this near a search-result snippet length.'),
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Keyword tags',
          description: 'Optional keyword phrases for metadata and AI/search context.',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
