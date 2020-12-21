/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([])

  const initializeShoppingCart = () => {
    const shoppingCart = localStorage.getItem('shopping-cart')

    if (!shoppingCart) {
      localStorage.setItem('shopping-cart', '[]')

      return
    }

    setShoppingCart(JSON.parse(shoppingCart))
  }

  const addProductToCart = (product) => {
    product.quantity = 1

    setShoppingCart([...shoppingCart, product])

    const shoppingCartPersisted = JSON.parse(localStorage.getItem('shopping-cart'))

    localStorage.setItem('shopping-cart', JSON.stringify([...shoppingCartPersisted, product]))
  }

  const removeProductFromCart = (id) => {
    const newShoppingCart = shoppingCart.filter(product => product.id === id)

    setShoppingCart(newShoppingCart)

    localStorage.setItem('shopping-cart', JSON.stringify(newShoppingCart))
  }

  const increaseProductQuantity = (id) => {
    const cartProduct = shoppingCart.findIndex(product => product.id === id)

    if (shoppingCart[cartProduct].available === 0)
      return

    const newShoppingCart = shoppingCart

    newShoppingCart[cartProduct].quantity++

    setShoppingCart(newShoppingCart)

    localStorage.setItem('shopping-cart', JSON.stringify(newShoppingCart))
  }

  const decreaseProductQuantity = (id) => {
    const cartProduct = shoppingCart.findIndex(product => product.id === id)

    if (shoppingCart[cartProduct].quantity === 0) {
      removeProductFromCart(shoppingCart[cartProduct].id)

      return
    }

    const newShoppingCart = shoppingCart

    newShoppingCart[cartProduct].quantity--

    setShoppingCart(newShoppingCart)

    localStorage.setItem('shopping-cart', JSON.stringify(newShoppingCart))
  }

  return (
    <ShoppingCartContext.Provider value={
      {
        shoppingCart,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        initializeShoppingCart
      }
    }>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export default ShoppingCartContext
