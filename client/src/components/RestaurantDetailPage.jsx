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
        setSelectedRestaurant(response.data.data);
      } catch (err) {}
    }
    fetchData();
  }, [])

  return (
    <div>
      {selectedRestaurant && (
      <>
        <h2 className="text-center display-5">
          {selectedRestaurant.restaurant.name}
        </h2>
        <div className="text-center">
          <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
          <span className="text-warning ml-1">
            {selectedRestaurant.restaurant.count 
            ? `(${selectedRestaurant.restaurant.count})` 
            : "(0)"}
          </span>
        </div>
        <div className="mt-3">
          <Reviews reviews={selectedRestaurant.reviews}/>
          <AddReview/>
        </div>
      </>
      )}
    </div>
  )
}
