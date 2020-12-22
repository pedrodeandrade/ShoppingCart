/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'

import ShoppingCartContext from '~/contexts/ShoppingCartContext'

import { getProducts } from '~/controllers/products'

import Header from '~/components/Header'
import ProductCard from '~/components/ProductCard'
import ShoppingCartProductItem from '~/components/ShoppingCartProductItem'

import { showErrorAlert } from '~/utils/functions/alerts'
import { formatNumberToUSD } from '~/utils/functions/currency'

import {
  Container,
  ProductsContainer,
  ShoppingCartContainer,
  ShoppingCartTab,
  ShoppingCartTitleContainer,
  ShoppingCartTitle,
  ShoppingCartProductsContainer,
  ShoppingCartDataContainer,
  ShoppingCartDataLabel,
  ShoppingCartDataValue
} from './styles'

function ShoppingCart () {
  const [products, setProducts] = useState([])

  const { initializeShoppingCart, shoppingCart } = useContext(ShoppingCartContext)

  useEffect(async () => {
    initializeShoppingCart()

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

  const renderShoppingCartItem = (label, value) => (
    <ShoppingCartDataContainer>
      <ShoppingCartDataLabel>
        {label}
      </ShoppingCartDataLabel>
      <ShoppingCartDataValue>
        {formatNumberToUSD(value)}
      </ShoppingCartDataValue>
    </ShoppingCartDataContainer>
  )

  return (
    <Container>
      <Header/>
      <ProductsContainer>
        <ul>
        {
          products ? products.map(product => <li key={product.id.toString()}><ProductCard product={product}/> </li>) : null
        }
        </ul>
      </ProductsContainer>
      <ShoppingCartContainer>
        <ShoppingCartTab>
          <ShoppingCartTitleContainer>
            <ShoppingCartTitle>
              Shopping Cart
            </ShoppingCartTitle>
          </ShoppingCartTitleContainer>
          <ShoppingCartProductsContainer>
            {shoppingCart
              ? shoppingCart.map(({ id }) => <ShoppingCartProductItem key={id.toString()} productId={id}/>)
              : null
            }
          </ShoppingCartProductsContainer>
          {
            renderShoppingCartItem('Subtotal', 20)
          }
          {
            renderShoppingCartItem('Shipping', 10)
          }
          {
            renderShoppingCartItem('Discount', 30)
          }
          {
            renderShoppingCartItem('Total', 10)
          }
        </ShoppingCartTab>
      </ShoppingCartContainer>
    </Container>
  )
}

export default ShoppingCart
