// eslint-disable-next-line no-unused-vars
import React from 'react'
import { NavBar } from '../components/NavBar'

import { ListType } from '../components/lists/ListType'

export const Movies = () => {
  return (
    <>
      <NavBar/>
      <ListType title="Populares" top="popular" type="movie"/>
      <ListType title="Mejor valoradas" top="top_rated" type="movie"/>
      <ListType title="Estrenos" top="upcoming" type="movie"/>
    </>
  )
}
