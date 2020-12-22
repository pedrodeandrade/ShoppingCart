import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 25% 65% 10%;
  grid-template-rows: 100%;
  width: 90%;
  height: 25%;
  background-color: #D8D8D8;
  border: 1px solid #BBBBBB;
  margin-bottom: 2%;
  margin-top: 2%;
`

export const Photo = styled.div`
background-color: grey;
`

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 10px 10px 10px;
`
export const ProductName = styled.p`
  font-weight:bold;
  color: #383838;
  margin-bottom: 2%;
`

export const ProductValuesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    color: #8C8C8C;
  }
`

export const ProductQuantity = styled.p`
`

export const ProductPrice = styled.p`
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ActionButton = styled.button`
  flex-grow: 1;
  background-color:#D8D8D8;
  border-left: 1px solid #BBBBBB;
  border-bottom: none;
  border-top: ${props => props['border-top']};
  border-right: none;
`
