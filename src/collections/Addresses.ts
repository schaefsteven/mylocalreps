import type { CollectionConfig } from 'payload'

export const Addresses: CollectionConfig = {
  slug: 'addresses',
  admin: {
    useAsTitle: 'HouseNumber',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'HouseNumber',
      type: 'text',
      required: true,
    },
    {
      name: 'StreetName',
      type: 'text',
      required: true,
    },
  ],
}
