/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'

import ProductsContainer from '~/pages/shopping-cart/containers/products'
import ShoppingCartContainer from '~/pages/shopping-cart/containers/shopping-cart'

import Header from '~/components/Header'

import {
  Container
} from './styles'

function ShoppingCart () {
  return (
    <Container>
      <Header/>
      <ProductsContainer/>
      <ShoppingCartContainer/>
    </Container>
  )
}

export default ShoppingCart
