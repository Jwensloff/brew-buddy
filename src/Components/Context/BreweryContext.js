import React, { createContext, useContext } from 'react'

const BreweryContext = createContext()

function useBreweries(){
  const breweries = useContext(BreweryContext)
  console.log('breweries',breweries)
  if(!breweries){
    throw new Error ('useBreweries must be used within a provider.')
  }
  return breweries
}

export  { BreweryContext, useBreweries }