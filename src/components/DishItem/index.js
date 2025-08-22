import './index.css'
import {useState, useContext, useEffect} from 'react'

import {CartContext} from '../../context/CartContext'

const DishItem = props => {
  const {addToCart, cartList} = useContext(CartContext)
  const {dishDetails} = props

  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const cartItemQuantity = cartList.find(
      item => item.dishId === dishDetails.dishId,
    )
    const newQuantity = cartItemQuantity ? cartItemQuantity.quantity : 0
    setQuantity(newQuantity)
  }, [cartList, dishDetails.dishId])

  const increaseQuantity = () => {
    setQuantity(prevState => prevState + 1)
  }

  const decreaseQuantity = () => {
    setQuantity(prevState => (prevState > 1 ? prevState - 1 : 0))
  }

  const renderControllerButton = () => {
    return (
      <div className="quantity-inc-and-dec-btns">
        <button
          type="button"
          className="quantity-button"
          onClick={decreaseQuantity}
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          type="button"
          className="quantity-button"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
    )
  }

  return (
    <div className="dish-item-container">
      <img
        alt={dishDetails.dishName}
        className="dish-image-mobile-view"
        src={dishDetails.dishImage}
      />
      <div className="dish-text-details-container">
        <h1>{dishDetails.dishName}</h1>
        <p>
          {dishDetails.dishCurrency}

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
        {quantity > 0 && (
          <button
            type="button"
            className="add-to-cart-btn"
            onClick={() => addToCart({...dishDetails, quantity})}
          >
            ADD TO CART
          </button>
        )}
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
