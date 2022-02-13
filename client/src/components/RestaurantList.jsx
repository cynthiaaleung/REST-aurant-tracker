import { useContext, useEffect } from "react";
import restaurantFinder from "../apis/restaurantFinder";
import { RestaurantsContext } from "../context/restaurantsContext";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

export default function RestaurantList(props) {

  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async() => {
      try {
        // this will be added to the end of baseURL in restaurantFinder.js, in this case, adding "/"
        const response = await restaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
      } catch (err) {}
    }
    fetchData();
  }, [])

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    try {
      const response = await restaurantFinder.delete(`/${id}`);
      // set restaurant state to only show restaurants that is not the one clicked ("id")
      setRestaurants(restaurants.filter(restaurant => {
        return restaurant.id !== id;
      }))
    } catch (err) {}
  }

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    
    try {
      navigate(`/restaurants/${id}/update`);

    } catch (err) {}
  }

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
  }

  const renderRating = (restaurant) => {

    if(!restaurant.count) {
      return (
        <span className="text-warning">No Reviews</span>
      )
    }
    
    return (
      <>
        <StarRating rating={restaurant.id} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    )
  }

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && 
            restaurants.map((restaurant) => {
              return (
                <tr 
                  onClick={() => handleRestaurantSelect(restaurant.id)} 
                  key={restaurant.id}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>{"$".repeat(restaurant.price_range)}</td>
                    <td>{renderRating(restaurant)}</td>
                    <td>
                      <button 
                        onClick={(e) => handleUpdate(e, restaurant.id)}
                        className="btn btn-warning"
                      >Update
                      </button>
                    </td>
                    <td>
                      <button 
                        onClick={(e) => handleDelete(e, restaurant.id)}
                        className="btn btn-danger"
                      >Delete
                      </button>
                    </td>
                </tr>
              )
          })}
        </tbody>
      </table>
    </div>
  )
}
