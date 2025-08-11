import {AiOutlineShoppingCart} from 'react-icons/ai'
import {useContext} from 'react'
import './index.css'

import {CartContext} from '../../context/CartContext'

const Header = props => {
  const {onCartClick, restaurentInfo} = props

  // console.log('header details', restaurentInfo)

  const {cartList} = useContext(CartContext)
  
  const totalQuantity = cartList.map(eachItemqua => (eachItemqua.quantity)) 

  
  let sumQuantity = 0

  for (let each of totalQuantity){
    sumQuantity += each
  }

  console.log("sum quantity ", sumQuantity)

  console.log("total quantity",totalQuantity)
  return (
    <nav className="navbar-container">
      <h1>{restaurentInfo && restaurentInfo.restaurantName}</h1>

      <div className="my-orders-container">
        <h1>My Orders</h1>
        <button type="button" className="cart-btn" onClick={onCartClick}>
          <AiOutlineShoppingCart />
          {cartList.length !== 0 ? (
            <p className="cart-length">{sumQuantity}</p>
          ) : (
            ''
          )}
        </button>
      </div>
    </nav>
  )
}

export default Header
