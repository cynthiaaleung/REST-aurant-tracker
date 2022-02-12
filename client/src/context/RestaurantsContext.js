import { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {

  const [restaurants, setRestaurants] = useState([]);

  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant])
  }

  return (
    <RestaurantsContext.Provider value={{restaurants, setRestaurants, addRestaurants}}>
      {props.children}
    </RestaurantsContext.Provider>
  )
}

// wrapping whole App with RestaurantsContextProvider is a way to pass data through the component tree without needing to pass props down manually at every level