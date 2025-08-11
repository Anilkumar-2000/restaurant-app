import './App.css'
import Home from './components/Home'

import Header from './components/Header'
import Cart from './components/Cart'

import {useState} from 'react'
import {CartProvider} from './context/CartContext'

//write your code here
const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
    console.log(isCartOpen)
  }

  return (
    <>
      <CartProvider>
        <Home />
      </CartProvider>
    </>
  )
}
export default App
