import { defineType, defineField } from 'sanity'

export const portfolioCase = defineType({
  name: 'portfolioCase',
  title: 'Portafolio',
  type: 'document',
  fields: [
    defineField({
      name: 'uen',
      title: 'Área (UEN)',
      type: 'string',
      description: 'Selecciona el área de negocio a la que pertenece este caso.',
      options: {
        list: [
          { title: 'Investigación de Mercados', value: 'investigacion-de-mercado' },
          { title: 'Marketing Digital',          value: 'marketing-digital' },
          { title: 'Branding',                   value: 'branding' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industria / Sector',
      type: 'string',
      description: 'Clasifica la industria del cliente para el filtro en la página web.',
      options: {
        list: [
          { title: 'Alimentos & Bebidas',           value: 'alimentos-bebidas' },
          { title: 'Bebidas Alcohólicas',            value: 'bebidas-alcoholicas' },
          { title: 'Automotriz',                     value: 'automotriz' },
          { title: 'Consumo Masivo (FMCG)',           value: 'fmcg' },
          { title: 'Construcción & Real Estate',     value: 'construccion' },
          { title: 'Educación',                      value: 'educacion' },
          { title: 'Gobierno & Sector Público',      value: 'gobierno' },
          { title: 'Hotelería & Turismo',            value: 'hoteleria-turismo' },
          { title: 'Manufactura & Industrial',       value: 'manufactura' },
          { title: 'Retail & Moda',                  value: 'retail-moda' },
          { title: 'Salud & Farmacéutica',           value: 'salud-farma' },
          { title: 'Servicios Financieros',          value: 'servicios-financieros' },
          { title: 'Tecnología',                     value: 'tecnologia' },
          { title: 'Telecomunicaciones',             value: 'telecomunicaciones' },
          { title: 'Otro',                           value: 'otro' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Nombre del cliente / empresa',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'projectTitle',
      title: 'Título del proyecto',
      type: 'string',
      description: 'Ej: "Estudio de Posicionamiento de Marca" o "Análisis de Consumidor"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción breve (tarjeta)',
      type: 'text',
      rows: 3,
      description: 'Resumen de 1-2 líneas que aparece en la tarjeta. Máx. 160 caracteres.',
      validation: Rule => Rule.required().max(200),
    }),
    defineField({
      name: 'objectives',
      title: 'Objetivos del proyecto',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'results',
      title: 'Resultados clave',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista de resultados o entregables. Agrega uno por línea.',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo del cliente (opcional)',
      type: 'image',
      options: { hotspot: false },
    }),
    defineField({
      name: 'color',
      title: 'Color de acento',
      type: 'string',
      options: {
        list: [
          { title: 'Rojo WeProm    #c5362e', value: '#c5362e' },
          { title: 'Azul WeProm    #599ddf', value: '#599ddf' },
          { title: 'Verde WeProm   #80b67d', value: '#80b67d' },
          { title: 'Amarillo WeProm #e6af41', value: '#e6af41' },
        ],
        layout: 'radio',
      },
      initialValue: '#599ddf',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: '¿Destacado?',
      type: 'boolean',
      description: 'Los casos destacados aparecen primero y con mayor tamaño.',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'client', subtitle: 'projectTitle', media: 'coverImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media }
    },
  },
  orderings: [
    { title: 'Orden personalizado', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Cliente A→Z',         name: 'clientAsc', by: [{ field: 'client', direction: 'asc' }] },
  ],
})
