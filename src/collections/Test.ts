import type { CollectionConfig } from 'payload'

export const Test: CollectionConfig = {
  slug: 'test',
  admin: {
    useAsTitle: 'name'
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'geoJSON',
      type: 'geometry',
      index: '2dsphere',
      required: true,
    },
  ],
}
