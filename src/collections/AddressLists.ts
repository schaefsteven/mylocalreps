import type { CollectionConfig } from 'payload'

export const AddressLists: CollectionConfig = {
  slug: 'address-lists',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'addresses',
      type: 'json',
      required: true,
    },
  ],
}
