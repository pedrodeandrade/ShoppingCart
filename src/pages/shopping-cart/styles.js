import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  background-color: red;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 10% auto;
  grid-template-areas:
    "header header"
    "products cart";
`

export const ProductsContainer = styled.div`
  grid-area: products;
  background-color: blue;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`
