export default function StarRating({ rating }) {

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // display filled-in star
      stars.push(<i className="fas fa-star"></i>);

      // move the rating up if it is not a whole number, display half star
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) { 
      stars.push(<i className="fas fa-star-half-alt"></i>)
    } else {
      // display empty star
      stars.push(<i className="far fa-star"></i>);
    }
  }

  return (
    <>
    {stars}
    </>
  )
}
