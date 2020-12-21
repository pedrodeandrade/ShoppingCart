import React from 'react'
import { ToastContainer } from 'react-toastify'

import ShoppingCart from '~/pages/shopping-cart'

import GlobalStyle from './styles/global'

function App () {
  return <>
      <ShoppingCart/>
      <GlobalStyle/>
      <ToastContainer/>
    </>
}

export default App
