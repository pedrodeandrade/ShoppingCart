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

export const ProductsContainer = styled.div`
  grid-area: products;
  background-color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 3%;

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
  }
`
export const ShoppingCartContainer = styled.div`
  grid-area: cart;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
`
export const ShoppingCartTab = styled.div`
  display:grid;
  grid-template-rows: 10% 40% 10% 10% 10% 10% 10%;
  background-color: #D8D8D8; 
  border-radius: 2%;
  height: 80%;
  width: 50%; 
  margin-right: 10%;
`

export const ShoppingCartTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #BBBBBB;
`

export const ShoppingCartTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: #333333;
`
export const ShoppingCartProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`

export const ShoppingCartDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 3%;
  border-top: 1px solid #BBBBBB;
`
export const ShoppingCartDataLabel = styled.p`
  font-size: 20px;
  color: #333333;
`
export const ShoppingCartDataValue = styled.p`
  font-size: 15px;
  color: #333333;
`

export const CheckoutButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 10%;
  width: 100%;
`

export const CheckoutButton = styled.button`
  border:none;
  background-color: #393939;
  height: 100%;
  width: 40%;
  border-radius: 10px;
  margin-right: 15%;
`

export const CheckoutButtonTitleStyle = styled.span`
  font-weight: bold;
  color: white;
`
export const DiscountCodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 3%;
  border-top: 1px solid #BBBBBB;
`

export const DiscountCodeInput = styled.input`
  padding: 2% 0 2% 2%;
`
export const DiscountCodeButton = styled.button`
  border:none;
  background-color: #393939;
  height: 70%;
  width: 20%;
  border-radius: 5px;
  padding-bottom:2px;
`

export const DiscountButtonTitleStyle = styled(CheckoutButtonTitleStyle)`
  font-size: 10px;
`
