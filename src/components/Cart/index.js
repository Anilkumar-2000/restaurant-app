import './index.css'
import {useContext} from 'react'
import {CartContext} from '../../context/CartContext'

const Cart = ({isOpen, onClose}) => {
  const {cartList} = useContext(CartContext)

  console.log('cartlist', cartList)
  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <button className='close-btn' onClick={onClose}>
        x
      </button>
      <h2>Your Cart</h2>
      {/* Cart content here */}

      <div className='cart-items-container'>
        {cartList.map(each => (
          <div key={each.dishId}>
            <div className='cart-item-container'>
              <div className='cart-text-details-container'>
                <h1>{each.dishName}</h1>
                <p>
                  {each.dishCurrency} {each.dishPrice}{' '}
                </p>
                <div className='quantity-inc-and-dec-btns'>
                  <p>Quantity: {each.quantity}</p>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart
