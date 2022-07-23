import React from "react";
import { useSelector } from "react-redux";

const CastsGallery = () => {
  const movie = useSelector((store) => store.movieReducer.movie);
  const modalContent = useSelector((store) => store.modalReducer.modalContent);

  let detailRenders;
  if (modalContent === "Casts") {
    detailRenders = (
      <>
        <h1 style={{ textAlign: "center" }}>Movie Casts</h1>
        <div className="movie-gallery">
          {movie.Casts.map((item) => (
            <div key={item.id} className="gallery-box">
              <h1>{item.name}</h1>
              <img src={item.profilePict} alt="" />
            </div>
          ))}
        </div>
      </>
    );
  } else if (modalContent === "Synopsis") {
    detailRenders = <p>{movie.synopsis}</p>;
  }

  return <>{detailRenders}</>;
};

export default CastsGallery;
