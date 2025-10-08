import type { CollectionConfig } from 'payload'

export const Offices: CollectionConfig = {
  slug: 'offices',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'currentHolders',
      hasmany: true,
      type: 'relationship',
      required: false,
      relationTo: 'people',
    },
    {
      name: 'jurisdiction',
      type: 'join',
      collection: 'jurisdictions',
      on: 'offices',
    },
  ],
}
