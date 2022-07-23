import React from "react";
import * as action from "../store/actions/actions";
import * as actionType from "../store/actions/actionType";
import { useDispatch } from "react-redux";
import { useState } from "react";
import loading from "../assets/loading.gif";
import { showError, showSuccess } from "../helpers/swal";

const TableRowMovies = ({ datum, idx }) => {
  // console.log(datum);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const seeMovieCasts = (slug) => {
    setIsLoading(true);
    dispatch(action.fetchOneMovie(slug))
      .then(() => {
        dispatch({
          type: actionType.TOGGLE_MODAL,
        });
        dispatch({
          type: actionType.MOVIE_CASTS,
        });
      })
      .catch((err) => showError(err))
      .finally(() => setIsLoading(false));
  };

  const seeSynopsis = (slug) => {
    setIsLoading(true);
    dispatch(action.fetchOneMovie(slug))
      .then(() => {
        dispatch({
          type: actionType.TOGGLE_MODAL,
        });
        dispatch({
          type: actionType.MOVIE_SYNOPSIS,
        });
      })
      .catch((err) => showError(err))
      .finally(() => setIsLoading(false));
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    dispatch(action.deleteMovie(id))
      .then(() => showSuccess("Success delete movie!"))
      .catch((err) => showError(err))
      .finally(() => setIsLoading(false));
  };
  const clickEdit = (slug) => {
    setIsLoading(true);
    dispatch(action.fetchOneMovie(slug))
      .then(() => {
        dispatch({
          type: actionType.TOGGLE_MODAL,
        });
        dispatch({
          type: actionType.FORM_TYPE_UPDATE,
        });
      })
      .catch((err) => showError(err))
      .finally(() => setIsLoading(false));
  };

  const formatDate = (val) => {
    const date = new Date(val);
    return date.toLocaleDateString("en-GB");
  };
  return (
    <tr key={datum.id}>
      {isLoading ? (
        <td colSpan={"100%"}>
          <img src={loading} alt="" style={{ height: "60px" }} />
        </td>
      ) : (
        <>
          <td>{idx + 1}</td>
          <td className="not-center">{datum.title}</td>
          <td>
            {<img src={datum.imgUrl} style={{ height: "100px" }} alt="" />}
          </td>
          <td>{datum.Genre.name}</td>
          <td>{datum.rating}</td>

          <td>
            <button
              onClick={() => seeSynopsis(datum.slug)}
              className="btn btn-yellow"
            >
              Synopsis
            </button>
          </td>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href={datum.trailerUrl}
              className="btn btn-yellow"
            >
              Trailer
            </a>
          </td>
          <td>
            <button
              onClick={() => seeMovieCasts(datum.slug)}
              className="btn btn-yellow"
            >
              Casts
            </button>
          </td>
          <td>{formatDate(datum.createdAt)}</td>
          <td>{formatDate(datum.updatedAt)}</td>
          <td>{datum.User.username}</td>
          <td>
            <button
              onClick={() => clickEdit(datum.slug)}
              className="btn btn-left"
            >
              Edit
            </button>
            <button onClick={() => handleDelete(datum.id)} className="btn">
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default TableRowMovies;
