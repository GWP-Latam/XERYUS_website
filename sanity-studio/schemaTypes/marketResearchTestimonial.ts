import { defineType, defineField } from 'sanity'

export const marketResearchTestimonial = defineType({
  name: 'marketResearchTestimonial',
  title: 'Testimonios (Inv. de Mercados)',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Orden', type: 'number', validation: Rule => Rule.required() }),
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'location', title: 'Ubicación', type: 'string' }),
    defineField({ name: 'date', title: 'Fecha', type: 'date', validation: Rule => Rule.required() }),
    defineField({
      name: 'comment',
      title: 'Comentario',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Calificación (1 a 5 estrellas)',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5).integer(),
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
    }),
    defineField({
      name: 'helpfulCount',
      title: 'A cuántas personas les pareció útil',
      type: 'number',
      description: 'Muestra "A X personas les pareció útil" en la tarjeta de este testimonio.',
      initialValue: 0,
      validation: Rule => Rule.min(0).integer(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'location', description: 'comment' },
  },
  orderings: [{ title: 'Orden', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
