import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import {CartProvider} from './context/CartContext'

import Home from './components/Home'
import Login from './components/Login'

import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

//write your code here
const App = () => {
  return (
    <>
      <CartProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </CartProvider>
    </>
  )
}
export default App
