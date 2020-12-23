import React, { useState, useEffect } from 'react'

import ProductsView from '~/pages/shopping-cart/presentation/products/index'

import { getProducts } from '~/controllers/products'

import { showErrorAlert } from '~/utils/functions/alerts'

function ProductsContainer () {
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
      showErrorAlert('A error happened when trying to load the products, please refresh the page!')
    }
  }

  return (<ProductsView products={products}/>)
}

export default ProductsContainer
