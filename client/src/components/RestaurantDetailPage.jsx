import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import restaurantFinder from "../apis/restaurantFinder";
import { RestaurantsContext } from "../context/restaurantsContext";
import AddReview from "./AddReview";
import Reviews from "./Reviews";
import StarRating from "./StarRating";

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
      {selectedRestaurant && (
        <>
          <div className="mt-3">
            <Reviews/>
            <AddReview/>
          </div>
        </>
      )}
    </div>
  )
}
