import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import UpdatePage from "./components/UpdatePage";
import RestaurantDetailPage from "./components/RestaurantDetailPage";

export default function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/restaurants/:id" element={<RestaurantDetailPage/>}/>
          <Route exact path="/restaurants/:id/update" element={<UpdatePage/>}/>
        </Routes>
      </Router>
    </div>
  )
}
