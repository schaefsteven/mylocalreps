import React from 'react'
import './styles.css'

import { PayloadSDK } from '@payloadcms/sdk'
import type { Config } from './payload-types'

export default async function HomePage() {

  const sdk = new PayloadSDK<Config>({
    baseURL: 'http://localhost:3000/api'
  })
  
  const offices = await sdk.find({
    collection: 'offices',
    depth: 2,
  })

  console.log(offices)

  return (
    <div className="home">
      <div className="content">
        <h1>My Local Reps</h1>
        {offices.docs.map((doc, key) => (
          <div key={key}>
            <h2>{doc.title}</h2>
            <p>{doc?.jurisdiction?.docs[0]?.name}</p>
            <p>{doc?.currentHolders?.firstName} {doc?.currentHolders?.lastName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
