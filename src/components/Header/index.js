import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {CartContext} from '../../context/CartContext'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {restaurentInfo} = props

  // console.log('header details', restaurentInfo)

  const {cartList} = useContext(CartContext)

  const logoutHandler = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <h1>{restaurentInfo && restaurentInfo.restaurantName}</h1>

      <div className="my-orders-container">
        <h1>My Orders</h1>
        <Link to={`/cart`}>
          <button type="button" className="cart-btn">
            <AiOutlineShoppingCart />
            {cartList.length > 0 && (
              <p className="cart-length">
                {cartList.length !== 0 ? cartList.length : ''}
              </p>
            )}
          </button>
        </Link>

        <button className="cart-btn" data-testid="cart" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
