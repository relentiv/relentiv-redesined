import { defineField, defineType } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Author name',
      type: 'string',
      description: 'The name shown on blog posts.',
      placeholder: 'Example: Priya Sharma',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Author URL',
      type: 'slug',
      description: 'Click Generate after entering the author name.',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Profile photo',
      type: 'image',
      description: 'Optional author photo. A square headshot works best.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Short bio',
      type: 'array',
      description: 'Optional one or two sentence bio for the author.',
      of: [
        {
          type: 'block',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
