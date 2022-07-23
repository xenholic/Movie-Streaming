import React from "react";
import * as action from "../store/actions/actions";
import * as actionType from "../store/actions/actionType";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { showError, showSuccess } from "../helpers/swal";
import loading from "../assets/loading.gif";

const FormNewMovie = () => {
  const dispatch = useDispatch();
  const movie = useSelector((store) => store.movieReducer.movie);
  const genres = useSelector((store) => store.genreReducer.genres);
  const modalContent = useSelector((store) => store.modalReducer.modalContent);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(action.fetchGenre());
  }, [dispatch]);

  const initialStateObj = useMemo(() => {
    return {
      title: "",
      synopsis: "",
      trailerUrl: "",
      imgUrl: "",
      rating: "",
      genreId: 1,
      name1: "",
      profilePict1: "",
      name2: "",
      profilePict2: "",
      name3: "",
      profilePict3: "",
    };
  }, []);
  const [movieObj, setMovieObj] = useState(initialStateObj);

  useEffect(() => {
    if (modalContent === "Create") {
      setMovieObj(initialStateObj);
    } else if (modalContent === "Update") {
      const { name: name1, profilePict: profilePict1 } = movie.Casts[0];
      const { name: name2, profilePict: profilePict2 } = movie.Casts[1];
      const { name: name3, profilePict: profilePict3 } = movie.Casts[2];
      setMovieObj({
        ...movie,
        name1,
        profilePict1,
        name2,
        profilePict2,
        name3,
        profilePict3,
      });
    }
  }, [modalContent, movie, initialStateObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const theSlug = movieObj.title.toLowerCase().split(" ").join("-");
    if (modalContent === "Create") {
      dispatch(
        action.addMovie({
          ...movieObj,
          slug: theSlug,
        })
      )
        .then(() => {
          setIsLoading(false);
          dispatch({
            type: actionType.TOGGLE_MODAL,
          });
          showSuccess("Success add new movie!");
        })
        .catch((err) => {
          setIsLoading(false);
          showError(err);
        });
    } else if (modalContent === "Update") {
      dispatch(
        action.editMovie({
          ...movieObj,
          id: movie.id,
          slug: theSlug,
        })
      )
        .then(() => {
          setIsLoading(false);
          dispatch({
            type: actionType.TOGGLE_MODAL,
          });
          showSuccess("Success edit movie!");
        })
        .catch((err) => {
          setIsLoading(false);
          showError(err);
        });
    }
  };
  return (
    <>
      {isLoading ? (
        <img src={loading} alt="" />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="box">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              onChange={(e) =>
                setMovieObj({ ...movieObj, title: e.target.value })
              }
              value={movieObj.title}
            />
          </div>
          <div className="box">
            <label htmlFor="genreId">GenreId</label>
            <select
              onChange={(e) =>
                setMovieObj({ ...movieObj, genreId: e.target.value })
              }
              value={movieObj.genreId}
            >
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className="box">
            <label htmlFor="synopsis">Synopsis</label>
            <textarea
              type="text"
              id="synopsis"
              onChange={(e) =>
                setMovieObj({ ...movieObj, synopsis: e.target.value })
              }
              value={movieObj.synopsis}
            />
          </div>
          <div className="box">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              onChange={(e) =>
                setMovieObj({ ...movieObj, rating: +e.target.value })
              }
              value={movieObj.rating}
            />
          </div>
          <div className="box">
            <label htmlFor="trailer">Trailer Url</label>
            <input
              type="text"
              id="trailer"
              onChange={(e) =>
                setMovieObj({ ...movieObj, trailerUrl: e.target.value })
              }
              value={movieObj.trailerUrl}
            />
          </div>
          <div className="box">
            <label htmlFor="imageUrl">Image Url</label>
            <input
              type="text"
              id="imageUrl"
              onChange={(e) =>
                setMovieObj({ ...movieObj, imgUrl: e.target.value })
              }
              value={movieObj.imgUrl}
            />
          </div>
          <div className="box">
            <label htmlFor="imageUrl">Cast 1</label>
            <input
              type="text"
              id="imageUrl"
              onChange={(e) =>
                setMovieObj({ ...movieObj, name1: e.target.value })
              }
              value={movieObj.name1}
              placeholder="name"
              style={{ marginBottom: "12px" }}
            />
            <input
              type="text"
              id="imageUrl"
              onChange={(e) =>
                setMovieObj({ ...movieObj, profilePict1: e.target.value })
              }
              value={movieObj.profilePict1}
              placeholder="Profile Picture (link)"
            />
          </div>
          <div className="box">
            <label htmlFor="imageUrl">Cast 2</label>
            <input
              type="text"
              id="imageUrl"
              onChange={(e) =>
                setMovieObj({ ...movieObj, name2: e.target.value })
              }
              value={movieObj.name2}
              placeholder="name"
              style={{ marginBottom: "12px" }}
            />
            <input
              type="text"
              id="imageUrl"
              onChange={(e) =>
                setMovieObj({ ...movieObj, profilePict2: e.target.value })
              }
              value={movieObj.profilePict2}
              placeholder="Profile Picture (link)"
            />
          </div>
          <div className="box">
            <label htmlFor="imageUrl">Cast 3</label>
            <input
              type="text"
              id="imageUrl"
              onChange={(e) =>
                setMovieObj({ ...movieObj, name3: e.target.value })
              }
              value={movieObj.name3}
              placeholder="name"
              style={{ marginBottom: "12px" }}
            />
            <input
              type="text"
              id="imageUrl"
              onChange={(e) =>
                setMovieObj({ ...movieObj, profilePict3: e.target.value })
              }
              value={movieObj.profilePict3}
              placeholder="Profile Picture (link)"
            />
          </div>
          <button className="btn" type="submit">
            Save
          </button>
        </form>
      )}
    </>
  );
};

export default FormNewMovie;
