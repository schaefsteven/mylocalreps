import type { CollectionConfig } from 'payload'

export const Jurisdictions: CollectionConfig = {
  slug: 'jurisdictions',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'offices',
      type: 'relationship',
      hasMany: true,
      required: false,
      relationTo: 'offices',
    },
    {
      name: 'boundary',
      type: 'json',
      required: false,
    },
  ],
}
