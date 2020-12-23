/* eslint-disable react/prop-types */
import React from 'react'

import ProductCard from '~/components/ProductCard'

import { ProductsContainer } from './styles'

function ProductsView ({ products }) {
  return (
    <ProductsContainer>
      <ul>
      {
        products ? products.map(product => <li key={product.id.toString()}><ProductCard product={product}/> </li>) : null
      }
      </ul>
    </ProductsContainer>
  )
}

export default ProductsView
