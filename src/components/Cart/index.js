import './index.css'
import {useContext} from 'react'
import {CartContext} from '../../context/CartContext'

const Cart = () => {
  const {
    cartList,
    increaseQuantity,
    decreaseQuantity,
    removeAll,
    removeItemFromCart,
  } = useContext(CartContext)

  const renderEmptyView = () => (
    <div className="empty-cart-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty view"
        className="empty-view-image"
      />
      <p className="empty-description">Your cart is Empty.</p>
    </div>
  )

  const renderCartListView = () => {
    return (
      <>
        <button type="button" className="remove-all-btn" onClick={removeAll}>
          Remove All
        </button>
        <h2>Your Cart</h2>
        <div className="cart-items-container">
          {cartList.map(each => (
            <div key={each.dishId}>
              <div className="cart-item-container">
                <div className="cart-text-details-container">
                  <h1>{each.dishName}</h1>
                  <p>
                    {each.dishCurrency} {each.dishPrice * each.quantity}
                  </p>
                  <div className="quantity-inc-and-dec-btns">
                    <p>Quantity: {each.quantity}</p>
                  </div>
                </div>
                <img className="dish-image" src={each.dishImage} />
              </div>
              <div className="quantity-and-remove-all-container">
                <div className="quantity-inc-and-dec-btns">
                  <button
                    type="button"
                    className="quantity-button"
                    onClick={() => decreaseQuantity(each.dishId)}
                  >
                    -
                  </button>

                  <button
                    type="button"
                    className="quantity-button"
                    onClick={() => increaseQuantity(each.dishId)}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => removeItemFromCart(each.dishId)}>
                  Remove Item
                </button>
              </div>

              <hr />
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="cart-sidebar">
      {cartList.length === 0 ? renderEmptyView() : renderCartListView()}
    </div>
  )
}

export default Cart
