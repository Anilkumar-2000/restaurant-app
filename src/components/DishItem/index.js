import './index.css'
import {useState, useContext} from 'react'

import {CartContext} from '../../context/CartContext'

const DishItem = props => {
  const {dishDetails} = props
  // console.log('dishes', dishDetails)

  const {addToCart, cartList, decreaseFromCart} = useContext(CartContext)

  const dishQuantity = cartList.find(
    eachDish => eachDish.dishId === dishDetails.dishId,
  )

  const renderControllerButton = () => {
    return (
      <div className="quantity-inc-and-dec-btns">
        <button
          type="button"
          className="quantity-button"
          onClick={() => decreaseFromCart(dishDetails)}
        >
          -
        </button>
        <p>{dishQuantity?.quantity || 0}</p>
        <button
          type="button"
          className="quantity-button"
          onClick={() => addToCart(dishDetails)}
        >
          +
        </button>
      </div>
    )
  }

  return (
    <div className="dish-item-container">
      <div className="dish-text-details-container">
        <h1>{dishDetails.dishName}</h1>
        <p>
          {dishDetails.dishCurrency}
          {'   '}
          {'   '}
          {dishDetails.dishPrice}
        </p>
        <p>{dishDetails.dishCalories} calories</p>

        <p>{dishDetails.dishDescription}</p>
        {dishDetails.dishAvailability && renderControllerButton()}
        {!dishDetails.dishAvailability && (
          <p className="available-text">Not available</p>
        )}
        {dishDetails.addonCat.length !== 0 && (
          <p className="custom-text">Customizations available</p>
        )}
        {dishDetails.dishAvailability && <p>{}</p>}
      </div>
      <img
        alt={dishDetails.dishName}
        className="dish-image"
        src={dishDetails.dishImage}
      />
    </div>
  )
}

export default DishItem
