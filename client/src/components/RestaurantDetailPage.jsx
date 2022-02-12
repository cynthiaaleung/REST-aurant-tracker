import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import restaurantFinder from "../apis/restaurantFinder";
import { RestaurantsContext } from "../context/restaurantsContext";

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant }= useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await restaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurant)
      } catch (err) {}
    }
    fetchData();
  }, [])

  return (
    <div>
      <h2>{selectedRestaurant && selectedRestaurant.name}</h2>
    </div>
  )
}
