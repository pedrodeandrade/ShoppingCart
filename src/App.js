import React from 'react'
import { ToastContainer } from 'react-toastify'

import { ShoppingCartProvider } from '~/contexts/ShoppingCartContext'

import ShoppingCart from '~/pages/shopping-cart'

import GlobalStyle from './styles/global'

function App () {
  return <>
      <ShoppingCartProvider>
        <ShoppingCart/>
      </ShoppingCartProvider>
      <GlobalStyle/>
      <ToastContainer/>
    </>
}

export default App
