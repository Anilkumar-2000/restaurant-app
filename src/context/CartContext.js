import {createContext, useState} from 'react'

export const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cartList, setCartList] = useState([])
  const [restaurantName, setRestaurantName] = useState('')

  const addToCart = dish => {
    setCartList(prevCart => {
      const isExits = prevCart.find(item => item.dishId === dish.dishId)

      if (isExits) {
        return prevCart.map(dishItem =>
          dishItem.dishId === dish.dishId
            ? {...dishItem, quantity: dishItem.quantity + 1}
            : dishItem,
        )
      }

      return [...prevCart, {...dish, quantity: 1}]
    })
  }

  const decreaseFromCart = dish => {
    setCartList(prevCart => {
      const existing = prevCart.find(
        cartItem => cartItem.dishId === dish.dishId,
      )

      if (!existing) {
        return prevCart
      }

      if (existing.quantity === 1) {
        return prevCart.filter(cartItem => cartItem.dishId !== dish.dishId) // remove item
      }
      return prevCart.map(cartItem =>
        cartItem.dishId === dish.dishId
          ? {...cartItem, quantity: cartItem.quantity - 1}
          : cartItem,
      )
    })
  }

  return (
    <CartContext.Provider
      value={{addToCart, cartList, decreaseFromCart, setRestaurantName}}
    >
      {children}
    </CartContext.Provider>
  )
}
