import {createContext, useState} from 'react'

export const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cartList, setCartList] = useState([])

  const addToCart = dish => {
    setCartList(prevCart => {
      const isItemExits = prevCart.find(item => item.dishId === dish.dishId)

      if (isItemExits) {
        return prevCart.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + dish.quantity}
            : item,
        )
      }
      return [...prevCart, {...dish, quantity: 1}]
    })
  }

  const increaseQuantity = id => {
    setCartList(prevCart => {
      return prevCart.map(item => {
        if (item.dishId === id) {
          const updatedQuantity = item.quantity + 1
          return {...item, quantity: updatedQuantity}
        }
        return item
      })
    })
  }

  const decreaseQuantity = id => {
    setCartList(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.dishId === id) {
          if (item.quantity > 1) {
            const updatedQuantity = item.quantity - 1
            return {...item, quantity: updatedQuantity}
          }
          return null
        }
        return item
      })
      return updatedCart.filter(item => item !== null)
    })
  }

  const removeAll = () => {
    setCartList([])
  }

  const removeItemFromCart = id => {
    setCartList(prevCart => prevCart.filter(item => item.dishId !== id))
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        increaseQuantity,
        decreaseQuantity,
        addToCart,
        removeAll,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
