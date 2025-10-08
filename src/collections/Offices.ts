import type { CollectionConfig } from 'payload'

export const Offices: CollectionConfig = {
  slug: 'offices',
  admin: {
    useAsTitle: 'fullTitle',
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
    {
      name: 'fullTitle',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData['fullTitle']
          }
        ],
        afterRead: [
          async ({ data, req }) => {
            console.log(data)
            if (!data?.jurisdiction?.docs?.[0]) {
              return data?.title || '<No Title>'
            }
            
            const jurID = data.jurisdiction.docs[0]

            try {
              const jurDoc = await req.payload.findByID({
                collection: 'jurisdictions',
                select: {
                  name: true,
                },
                id: jurID,
                depth: 0,
              })

              return `${data.title} of ${jurDoc.name}`

            } catch (error) {
              console.error('Error fetching jurisdiction name:', error)
              return data?.title || '<No Title>'
            }
          }
        ],
      },
    },
  ],
}
