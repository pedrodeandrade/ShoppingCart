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
  ShoppingCartDataValue,
  CheckoutButtonContainer,
  CheckoutButton,
  CheckoutButtonTitleStyle
} from './styles'

function ShoppingCart () {
  const [products, setProducts] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)

  const { initializeShoppingCart, shoppingCart } = useContext(ShoppingCartContext)

  useEffect(async () => {
    initializeShoppingCart()

    const response = await getShopProducts()

    if (response)
      setProducts(response)
  }, [])

  useEffect(() => {
    calculateSubtotal()
  }, [shoppingCart])

  useEffect(() => {
    calculateTotal()
  }, [subtotal, shipping, discount])

  useEffect(() => {
    calculateShipping()
  }, [subtotal])

  async function getShopProducts () {
    try {
      const response = await getProducts()

      return response
    } catch (error) {
      showErrorAlert('A error happened when trying to load the products, please refresh the page!')
    }
  }

  function calculateSubtotal () {
    let shoppingCartSubtotal = 0

    shoppingCart.forEach(({ price, quantity }) => { shoppingCartSubtotal += (price * quantity) })

    setSubtotal(shoppingCartSubtotal)
  }

  function calculateTotal () {
    setTotal((subtotal + shipping) - discount)
  }

  function calculateShipping () {
    if (subtotal > 400) {
      setShipping(0)

      return
    }

    const productsWeight = calculateProductsWeight()

    const SHIPPING_PRICE_BELLOW_10KG = 30

    const TAX_OVER_SHIPPING = 7

    if (productsWeight <= 10 && shoppingCart.length > 0)
      setShipping(SHIPPING_PRICE_BELLOW_10KG)
    else if (productsWeight > 10) {
      setShipping(SHIPPING_PRICE_BELLOW_10KG + TAX_OVER_SHIPPING * (Math.floor((productsWeight - 10) / 5)))
    }
  }

  function calculateProductsWeight () {
    let productsWeight = 0

    shoppingCart.forEach(({ quantity }) => { productsWeight += quantity })

    return productsWeight
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
            renderShoppingCartItem('Subtotal', subtotal)
          }
          {
            renderShoppingCartItem('Shipping', shipping)
          }
          {
            renderShoppingCartItem('Discount', discount)
          }
          {
            renderShoppingCartItem('Total', total)
          }
        </ShoppingCartTab>
        <CheckoutButtonContainer>
          <CheckoutButton>
            <CheckoutButtonTitleStyle>
              CHECKOUT
            </CheckoutButtonTitleStyle>
          </CheckoutButton>
        </CheckoutButtonContainer>
      </ShoppingCartContainer>
    </Container>
  )
}

export default ShoppingCart
