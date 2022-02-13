import { useState } from "react"
import { useParams } from "react-router-dom";
import restaurantFinder from "../apis/restaurantFinder";

export default function AddReview() {

  // this gives us access to restaurant id, so we can use in line 16
  const { id } = useParams();

  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
    const response = await restaurantFinder.post(`/${id}/addReview`, {
      name: name,
      review: reviewText,
      rating: rating
    });
    window.location.reload();
    } catch (err) {}
  }

  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input 
              value={name}
              onChange={e => setName(e.target.value)}
              type="text" 
              className="form-control" 
              id="name" 
              placeholder="Name"/>
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select 
              value={rating}
              onChange={e => setRating(e.target.value)}
              className="custom-select" 
              id="rating">
                <option disabled>Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea 
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            className="form-control" 
            id="review">   
          </textarea>
        </div>
        <button
          onClick={handleSubmitReview} 
          type="submit"
          className="btn btn-primary">
            Submit
        </button>
      </form>
    </div>
  )
}
