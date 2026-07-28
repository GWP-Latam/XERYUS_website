import { defineType, defineField } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Equipo (Nosotros)',
  type: 'document',
  fields: [
    defineField({
      name: 'notionId',
      title: 'ID de Notion (no editar)',
      type: 'string',
      description: 'Vincula este documento con su página en Notion para que la sincronización automática lo actualice en vez de duplicarlo.',
      readOnly: true,
    }),
    defineField({
      name: 'notionLastEdited',
      title: 'Última edición en Notion (no editar)',
      type: 'string',
      description: 'Usado por el sync automático para saber si hay que volver a descargar la foto.',
      readOnly: true,
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Se sincroniza desde la propiedad "Orden web" en Notion.',
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'role', title: 'Puesto', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'email',
      title: 'Correo institucional',
      type: 'string',
      description: 'Se sincroniza desde "Correo Institucional" en Notion.',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      description: 'Se sincroniza desde "Descripción" en Notion. Se muestra en el popup de la tarjeta.',
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      description: 'Se sincroniza automáticamente desde la foto de portada de Notion. Puedes reemplazarla manualmente aquí, pero la próxima sincronización la sobrescribirá si cambia en Notion.',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Mostrar en la página web',
      type: 'boolean',
      description: 'Se sincroniza desde la casilla "Página XERYUS" en Notion. Gestiónalo desde ahí.',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
  orderings: [{ title: 'Orden', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
