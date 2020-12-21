/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

import { getProducts } from '~/controllers/products'

import Header from '~/components/Header'
import ProductCard from '~/components/ProductCard'

import { showErrorAlert } from '~/utils/functions/alerts'

import { Container, ProductsContainer } from './styles'

function ShoppingCart () {
  const [products, setProducts] = useState([])

  useEffect(async () => {
    const response = await getShopProducts()

    if (response)
      setProducts(response)
  }, [])

  async function getShopProducts () {
    try {
      const response = await getProducts()

      return response
    } catch (error) {
      showErrorAlert('A error happened when trying to load the products, please refresh the page')
    }
  }

  return (
    <Container>
      <Header/>
      <ProductsContainer>
        {
          products ? products.map(product => <ProductCard product={product} key={product.id.toString()}/>) : null
        }
      </ProductsContainer>
    </Container>
  )
}

export default ShoppingCart
