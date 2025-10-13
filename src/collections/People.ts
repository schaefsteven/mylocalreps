import type { CollectionConfig } from 'payload'

export const People: CollectionConfig = {
  slug: 'people',
  admin: {
    useAsTitle: 'lastName',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'offices',
      type: 'join',
      collection: 'offices',
      on: 'currentHolders',
    },
    {
      name: 'email',
      type: 'email',
      required: false,
    },
  ],
}
