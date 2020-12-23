import React, { useState, useEffect, useContext } from 'react'

import ShoppingCartContext from '~/contexts/ShoppingCartContext'

import ShoppingCart from '~/pages/shopping-cart/presentation/shopping-cart'

import { getVouchers } from '~/controllers/vouchers'

import { showErrorAlert, showSuccessAlert } from '~/utils/functions/alerts'
import { formatNumberToUSD } from '~/utils/functions/currency'

function ShoppingCartContainer () {
  const [subtotal, setSubtotal] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [total, setTotal] = useState(0)

  const { initializeShoppingCart, shoppingCart } = useContext(ShoppingCartContext)

  useEffect(async () => {
    initializeShoppingCart()
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

  function calculateProductsWeight () {
    let productsWeight = 0

    shoppingCart.forEach(({ quantity }) => { productsWeight += quantity })

    return productsWeight
  }

  function calculateShipping () {
    if (shoppingCart.length === 0 || subtotal > 400) {
      setShipping(0)

      return
    }

    const productsWeight = calculateProductsWeight()

    const shippingValueBelow10Kg = 30

    const shippingFee = 7

    if (productsWeight <= 10)
      setShipping(shippingValueBelow10Kg)
    else
      setShipping(shippingValueBelow10Kg + shippingFee * (Math.floor((productsWeight - 10) / 5)))
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

  async function applyDiscount () {
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

  function checkout () {
    showSuccessAlert('Thanks for buying with us')

    setTimeout(() => {
      localStorage.clear()
      location.reload()
    }, 3000)
  }

  return (
    <ShoppingCart
      shoppingCart={shoppingCart}
      discountCode={discountCode}
      discountApplied={discountApplied}
      subtotal={subtotal}
      shipping={shipping}
      discount={discount}
      total={total}
      applyDiscount={applyDiscount}
      checkout={checkout}
      updateDiscountCode={setDiscountCode}
    />
  )
}

export default ShoppingCartContainer
