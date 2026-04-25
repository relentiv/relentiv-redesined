import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Topic name',
      type: 'string',
      description: 'Short label used to group related blog posts.',
      placeholder: 'Example: Product Strategy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Topic URL',
      type: 'slug',
      description: 'Click Generate after entering the topic name.',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional note explaining what belongs in this topic.',
      placeholder: 'Example: Posts about product planning, MVP decisions, and founder tradeoffs.',
    }),
  ],
})
