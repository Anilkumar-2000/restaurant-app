import {useState, useEffect} from 'react'

import './index.css'

import DishItem from '../DishItem'
import Header from '../Header'

const Home = () => {
  const [restaurentInfo, setRestaurantInfo] = useState([])
  const [menuList, setMenuList] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')

  useEffect(() => {
    const getRestaurantInfo = async () => {
      const apiUrl =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

      const response = await fetch(apiUrl)
      const data = await response.json()
      console.log(data)

      if (response.ok) {
        const formattedData = {
          restaurantName: data[0].restaurant_name,
          restaurantImage: data[0].restaurant_image,
          branchName: data[0].branch_name,
        }
        setRestaurantInfo(formattedData)
      }
    }
    getRestaurantInfo()
  }, [])

  useEffect(() => {
    const getRestaurantInfo = async () => {
      const apiUrl =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

      const response = await fetch(apiUrl)
      const data = await response.json()
      console.log(data)

      if (response.ok) {
        const formattedMenuList = data[0].table_menu_list.map(eachCategory => ({
          menuCategory: eachCategory.menu_category,
          menuCategoryId: eachCategory.menu_category_id,
          menuCategoryImage: eachCategory.menu_category_image,
          categoryDishes: eachCategory.category_dishes.map(eachDish => ({
            dishId: eachDish.dish_id,
            dishImage: eachDish.dish_image,
            dishName: eachDish.dish_name,
            dishDescription: eachDish.dish_description,
            dishPrice: eachDish.dish_price,
            dishCalories: eachDish.dish_calories,
            dishType: eachDish.dish_Type,
            dishCurrency: eachDish.dish_currency,
            dishAvailability: eachDish.dish_Availability,
            addonCat: eachDish.addonCat,
          })),
        }))
        setMenuList(formattedMenuList)
        setActiveCategoryId(formattedMenuList[0].menuCategoryId)
      }
    }
    getRestaurantInfo()
  }, [])

  useEffect(() => {
    console.log('restaurant info : ', restaurentInfo)
    console.log('Menu List', menuList)
  }, [restaurentInfo, menuList])

  const renderTabList = () => {
    return (
      <div className="tab-list-container">
        {menuList.map(eachTab => (
          <button
            className={`tab-btn ${
              eachTab.menuCategoryId === activeCategoryId
                ? 'active-btn'
                : 'inactive-btn'
            }`}
            type="button"
            onClick={() => {
              setActiveCategoryId(eachTab.menuCategoryId)
            }}
            key={eachTab.menuCategoryId}
          >
            {eachTab.menuCategory}
          </button>
        ))}
      </div>
    )
  }

  const renderDishes = () => {
    const dishes = menuList.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )

    if (!dishes) return

    return (
      <div className="dish-items-container">
        {dishes.categoryDishes.map(each => (
          <DishItem key={each.dishId} dishDetails={each} />
        ))}
      </div>
    )
  }

  return (
    <>
      <div>
        <Header restaurentInfo={restaurentInfo} />
      </div>
      <div className="home-main-container">
        <div className="restaurant-info-container">
          <img
            alt="resimge"
            className="res-image"
            src={restaurentInfo.restaurantImage}
          />
        </div>
        {renderTabList()}
        {renderDishes()}
      </div>
    </>
  )
}

export default Home
