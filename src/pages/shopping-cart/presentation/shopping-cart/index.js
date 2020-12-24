import PropTypes from 'prop-types'
import React from 'react'

import ShoppingCartProductItem from '~/components/ShoppingCartProductItem'

import { formatNumberToUSD } from '~/utils/functions/currency'

import {
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

function ShoppingCartView ({
  shoppingCart,
  discountCode,
  discountApplied,
  subtotal,
  shipping,
  discount,
  total,
  applyDiscount,
  checkout,
  updateDiscountCode
}) {
  function handleCheckout (event) {
    event.preventDefault()

    checkout()
  }

  async function handleDiscountApply (event) {
    event.preventDefault()

    applyDiscount()
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
              onChange={({ target }) => updateDiscountCode(target.value)}
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
  )
}

export default ShoppingCartView

ShoppingCartView.propTypes = {
  shoppingCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  discountCode: PropTypes.string.isRequired,
  discountApplied: PropTypes.bool.isRequired,
  subtotal: PropTypes.number.isRequired,
  shipping: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  applyDiscount: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  updateDiscountCode: PropTypes.func.isRequired
}
