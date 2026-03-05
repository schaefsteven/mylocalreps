import type { CollectionConfig } from 'payload'

export const Addresses: CollectionConfig = {
  slug: 'addresses',
  admin: {
    //useAsTitle: 'type',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'type',
      type: 'text',
      required: true,
    },
    {
      name: 'properties',
      type: 'json',
      required: true,
    },
    {
      name: 'geometry',
      type: 'json',
      required: true,
    },
  ],
}
