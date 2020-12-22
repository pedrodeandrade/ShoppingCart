/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'

import ShoppingCartContext from '~/contexts/ShoppingCartContext'

import { getProducts } from '~/controllers/products'
import { getVouchers } from '~/controllers/vouchers'

import Header from '~/components/Header'
import ProductCard from '~/components/ProductCard'
import ShoppingCartProductItem from '~/components/ShoppingCartProductItem'

import { showErrorAlert, showSuccessAlert } from '~/utils/functions/alerts'
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
  CheckoutButtonTitleStyle,
  DiscountCodeContainer,
  DiscountCodeInput,
  DiscountCodeButton,
  DiscountButtonTitleStyle
} from './styles'

function ShoppingCart () {
  const [products, setProducts] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
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

  async function getDiscountVouchers () {
    try {
      const response = await getVouchers()

      return response
    } catch (error) {
      showErrorAlert('A error happened when trying to consult discounts available, please try again')
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
    if (shoppingCart.length === 0 || subtotal > 400) {
      setShipping(0)

      return
    }

    const productsWeight = calculateProductsWeight()

    const SHIPPING_PRICE_BELLOW_10KG = 30

    const TAX_OVER_SHIPPING = 7

    if (productsWeight <= 10)
      setShipping(SHIPPING_PRICE_BELLOW_10KG)
    else
      setShipping(SHIPPING_PRICE_BELLOW_10KG + TAX_OVER_SHIPPING * (Math.floor((productsWeight - 10) / 5)))
  }

  function calculateProductsWeight () {
    let productsWeight = 0

    shoppingCart.forEach(({ quantity }) => { productsWeight += quantity })

    return productsWeight
  }

  function calculateDiscount (voucher) {
    switch (voucher.type) {
      case 'percentual':
        setDiscount(total * voucher.amount / 100)
        break
      case 'fixed':
        setDiscount(voucher.amount)
        break
      case 'shipping':
        if (total >= voucher.minValue)
          setDiscount(total)
        else
          return `Value of your shopping cart have to be above ${formatNumberToUSD(voucher.minValue)} to use this discount code`
        break
    }

    setDiscountApplied(true)
  }

  async function handleDiscountApply (event) {
    event.preventDefault()

    if (shoppingCart.length === 0) {
      showErrorAlert('Please add products to the cart to use a discount code')

      return
    }

    const vouchers = await getDiscountVouchers()

    if (vouchers) {
      const voucher = vouchers.find(voucher => voucher.code === discountCode)

      if (voucher) {
        const hasError = calculateDiscount(voucher)

        !hasError ? setDiscountCode('') : showErrorAlert(hasError)
      } else
        showErrorAlert('Ops! Your discount code is invalid, please try again')
    }
  }

  function handleCheckout (event) {
    event.preventDefault()

    showSuccessAlert('Thanks for buying with us')

    setTimeout(() => {
      localStorage.clear()
      location.reload()
    }, 3000)
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
          <DiscountCodeContainer>
            <DiscountCodeInput
              typeof="text"
              placeholder="Discount code"
              value={discountCode}
              onChange={({ target }) => setDiscountCode(target.value)}
              disabled={discountApplied}
            />
            <DiscountCodeButton onClick={handleDiscountApply} disabled={discountApplied}>
              <DiscountButtonTitleStyle>
                APPLY
              </DiscountButtonTitleStyle>
            </DiscountCodeButton>
          </DiscountCodeContainer>
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
            renderShoppingCartItem('Total', total < 0 ? 0 : total)
          }
        </ShoppingCartTab>
        <CheckoutButtonContainer>
          <CheckoutButton onClick={handleCheckout} disabled={shoppingCart.length === 0}>
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
