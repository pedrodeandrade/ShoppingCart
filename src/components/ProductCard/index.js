/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

import { formatNumberToUSD } from '~/utils/functions/currency'

import { Container, Photo, Infos, Button, ButtonLabel, ProductName, ProductInfo } from './styles'

function ProductCard ({ product, onClick }) {
  return (
    <Container>
      <Photo/>
      <Infos>
        <ProductName>
          {product.name}
        </ProductName>
        <ProductInfo>
          {`${formatNumberToUSD(product.price)} - ${product.available} left`}
        </ProductInfo>
      </Infos>
      <Button>
        <ButtonLabel>
          BUY
        </ButtonLabel>
      </Button>
    </Container>
  )
}

export default ProductCard
