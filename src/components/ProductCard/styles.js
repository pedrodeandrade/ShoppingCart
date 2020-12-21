import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50% 30% 20%;
  grid-template-areas:
    "photo"
    "infos"
    "button";
  width: 150px;
  height: 250px;
  border-radius: 5%;
  background: yellow;
`

export const Photo = styled.div`
  background: #999999;
  grid-area: photo;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
`

export const Infos = styled.div`
  background: white;
  grid-area: infos;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

export const ProductName = styled.p`
  font-weight: bold;
  margin-bottom: 5%;
  margin-left: 20%;
`

export const ProductInfo = styled.p`
margin-left: 20%;
color: #8c8c8c;
`

export const Button = styled.button`
  background: #393939;
  grid-area: button;
  border-radius: 0 0 5% 5%;
  border:0;
  font-weight: bold;
`

export const ButtonLabel = styled.span`
  color:#fbfbfb;
`
