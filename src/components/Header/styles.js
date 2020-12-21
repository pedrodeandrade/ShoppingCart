import styled from 'styled-components'

export const Container = styled.header`
  grid-area: header;
  background-color: #d8d8d8;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.h1`
  margin-left: 5%;
`

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width:20%;
  margin-right: 30px;
`

export const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 40px;
  margin-right:10px;
`

export const ProfileName = styled.p`
  font-size: 18px;
  font-weight:bold;
  color: #323232;
`
