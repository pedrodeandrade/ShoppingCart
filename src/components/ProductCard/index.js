import PropTypes from 'prop-types'
import React, { useContext, useState, useEffect } from 'react'

import ShoppingCartContext from '~/contexts/ShoppingCartContext'

import { formatNumberToUSD } from '~/utils/functions/currency'

import { Container, Photo, Infos, Button, ButtonLabel, ProductName, ProductInfo } from './styles'

function ProductCard ({ product }) {
  const { addProductToCart, shoppingCart } = useContext(ShoppingCartContext)

  const [productsLeft, setProductsLeft] = useState(product.available - productQuantityOnShoppingCart())

  useEffect(() => setProductsLeft(product.available - productQuantityOnShoppingCart()), [shoppingCart])

  function handleBuy (event) {
    event.preventDefault()

    addProductToCart(product)

    setProductsLeft(productsLeft - 1)
  }

  function productQuantityOnShoppingCart () {
    const shoppingCartProduct = shoppingCart.find(({ id }) => id === product.id)

    return shoppingCartProduct ? shoppingCartProduct.quantity : 0
  }

  return (
    <Container>
      <Photo/>
      <Infos>
        <ProductName>
          {product.name}
        </ProductName>
        <ProductInfo>
          {`${formatNumberToUSD(product.price)} - ${productsLeft} left`}
        </ProductInfo>
      </Infos>
      <Button onClick={handleBuy} disabled={productsLeft !== product.available}>
        <ButtonLabel>
          BUY
        </ButtonLabel>
      </Button>
    </Container>
  )
}

export default ProductCard

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
}
