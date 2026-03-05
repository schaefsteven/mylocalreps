'use client'

import React, { useState, useEffect } from 'react'
import './styles.css'

import { PayloadSDK } from '@payloadcms/sdk'
import type { Config } from './payload-types'

export default function HomePage() {

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [addresses, setAddresses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sdk = new PayloadSDK<Config>({
    baseURL: 'http://localhost:3000/api'
  })

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!debouncedSearchTerm) {
        setAddresses([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const result = await sdk.find({
          collection: 'addresses',
          depth: 2,
          limit: 10,
          where: {
            'properties.HouseNumbe': {
              equals: debouncedSearchTerm,
            },
          },
        })
        setAddresses(result.docs)
      } catch (err) {
        setError('Failed to fetch addresses')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAddresses()
  }, [debouncedSearchTerm])
  
  const readableAddresses = addresses.map((doc) => (
    `${doc.properties.HouseNumbe} \
     ${doc.properties.StreetName} \
     ${doc.properties.PostType}, \
     ${doc.properties.Venue} \
     `
  ))

  return (
    <div className="home">
      <div className="content">
          <h1>My Local Reps</h1>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for address"
          />

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          {readableAddresses.map((addressString, key) => (
            <div key={key}>
            <span>
              {addressString}
            </span>
            </div>
          ))}
      </div>
    </div>
  )
}

/*
  const offices = await sdk.find({
    collection: 'offices',
    depth: 2,
  })

        {offices.docs.map((doc, key) => (
          <div key={key}>
            <h2>{doc.title}</h2>
            <p>{doc?.jurisdiction?.docs[0]?.name}</p>
            <p>{doc?.currentHolders?.firstName} {doc?.currentHolders?.lastName}</p>
          </div>
        ))}
        */
