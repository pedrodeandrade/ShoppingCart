import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  background-color: white;
  grid-template-columns: 2fr 2fr;
  grid-template-rows: 10% auto;
  grid-template-areas:
    "header header"
    "products cart";
`
