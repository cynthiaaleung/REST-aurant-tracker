import Header from "./Header"
import AddRestaurant from "./AddRestaurant"
import RestaurantList from "./RestaurantList"

export default function Home() {
  return (
    <div>
      <Header/>
      <AddRestaurant/>
      <RestaurantList/>
    </div>
  )
}
