/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react'

import ShoppingCartContext from '~/contexts/ShoppingCartContext'

import { formatNumberToUSD } from '~/utils/functions/currency'

import {
  Container,
  Photo,
  Data,
  Buttons,
  ProductValuesContainer,
  ProductName,
  ProductPrice,
  ProductQuantity,
  ActionButton
} from './styles'

function ShoppingCartProductItem ({ productId }) {
  const { increaseProductQuantity, decreaseProductQuantity, shoppingCart } = useContext(ShoppingCartContext)

  const product = shoppingCart.find(({ id }) => id === productId)

  return (
    <Container>
      <Photo/>
      <Data>
        <ProductName>
          {product.name}
        </ProductName>
        <ProductValuesContainer>
          <ProductQuantity>
            {`Quantity: ${product.quantity}`}
          </ProductQuantity>
          <ProductPrice>
            {formatNumberToUSD(product.price)}
          </ProductPrice>
        </ProductValuesContainer>
      </Data>
      <Buttons>
        <ActionButton border-top="none" onClick= {() => increaseProductQuantity(productId)} >
          +
        </ActionButton>
        <ActionButton border-top="1px solid #BBBBBB" onClick= {() => decreaseProductQuantity(productId)} >
          -
        </ActionButton>
      </Buttons>
    </Container>
  )
}

export default ShoppingCartProductItem
