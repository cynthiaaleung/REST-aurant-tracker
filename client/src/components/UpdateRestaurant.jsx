import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import restaurantFinder from "../apis/restaurantFinder";
import { RestaurantsContext } from "../context/restaurantsContext";

export default function UpdateRestaurant(props) {

  // useParams allows us to get and use the url param 
  const { id } = useParams();
  const { restaurants } = useContext(RestaurantsContext);
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");


  useEffect(() => {
    const fetchData = async() => {
      const response = await restaurantFinder.get(`/${id}`);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPriceRange(response.data.data.restaurant.price_range);
    }
    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRestaurant = await restaurantFinder.put(`/${id}`, {
      name: name,
      location: location,
      price_range: priceRange
    });
    navigate("/");
  }

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            value={name} 
            onChange={e => setName(e.target.value)} 
            id="name" 
            type="text" 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input 
            value={location} 
            onChange={e => setLocation(e.target.value)} 
            id="location" 
            ype="text" 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input 
            value={priceRange} 
            onChange={e => setPriceRange(e.target.value)} 
            id="price_range" 
            type="number" 
            className="form-control"
          />
        </div>
        <button 
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary">
            Submit
        </button>
      </form>
    </div>
  )
}
