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

  const directFetch = async () => {
    const where = {
      geoJSON: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [-86.114639, 41.661115]
          },
          $maxDistance: 1,
        }
      }
    };

    const queryString = new URLSearchParams({
      depth: '2',
      limit: '10',
      where: JSON.stringify(where)
    }).toString();

    const response = await fetch(`/api/test?${queryString}`);
    const result = await response.json();
    console.log(result);
  }

  //directFetch()

  const checkIntersect = async () => {
    try {
      const result = await sdk.find({
        collection: 'test',
        depth: 2,
        limit: 10,
        where: {
          geoJSON: {
            intersects: {
              type: 'Point',
              coordinates: [-86.114639, 41.661115]
            },
          },
        },
      })
      console.log(result)
    } catch (err) {
      console.error(err)
    }
  }

  checkIntersect()

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
            'properties.FullStreet': {
              like: debouncedSearchTerm,
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
    `${doc.properties.FullStreet}, \
     ${doc.properties.Venue}, \
     ${doc.properties.State} \
     ${doc.properties.Zip} | \
     ${doc.geometry.coordinates} \
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
WIP - Returning Jurisdictions
I think we're going to end up using the $geoIntersects operator. Payload does have an intersects operator, but the docs say it's for point fields, not polygons. But maybe it just works anyway? 
I think we need to get the polygons formatted correctly in Mongo somehow or another. I think they must be 2Dsphere indexes, but I think they probably already are?
https://stackoverflow.com/questions/20161180/mongodb-how-to-find-which-polygon-contains-a-specified-point
https://www.mongodb.com/docs/manual/geospatial-queries/#std-label-geospatial-geojson

I think we got there, after running Atlas atlas-rxvlab-shard-0 [primary] test> db.tests.createIndex({ "geoJSON": "2dsphere" })

  * */

