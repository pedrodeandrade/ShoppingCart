/* eslint-disable no-unused-vars */
import React from 'react'

import { Container, Title, ProfileContainer, ProfilePicture, ProfileName } from './styles'

function Header () {
  return (
    <Container>
      <Title>
        Market42
      </Title>
      <ProfileContainer>
        <ProfilePicture src="https://yt3.ggpht.com/ytc/AAUvwngi4gj2jLDKJPdSwx4_L4Du6m7dSlKiMSI0ffv6ycE=s88-c-k-c0x00ffffff-no-rj"/>
        <ProfileName>
          Fábio Akita
        </ProfileName>
      </ProfileContainer>
  </Container>
  )
}

export default Header
