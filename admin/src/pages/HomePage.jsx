import React from "react";
import Sidebar from "../components/Sidebar";
import TableReusable from "../components/TableReusable";
import ModalReusable from "../components/ModalReusable";
import FormNewMovie from "../components/FormNewMovie";
import TableRowMovies from "../components/TableRowMovies";
import MovieDetails from "../components/MovieDetails";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../store/actions/actions";
import * as actionType from "../store/actions/actionType";
import loading from "../assets/loading.gif";
import { showError } from "../helpers/swal";

const HomeView = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movieReducer.movies);
  const isModalShow = useSelector((store) => store.modalReducer.isModalShow);
  const modalContent = useSelector((store) => store.modalReducer.modalContent);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(action.fetchMovie())
      .then(() => setIsLoading(false))
      .catch((err) => showError(err));
  }, [dispatch]);

  const toggleModal = () => {
    dispatch({
      type: actionType.FORM_TYPE_CREATE,
    });
    dispatch({
      type: actionType.TOGGLE_MODAL,
    });
  };

  let modalRender;
  if (modalContent === "Create" || modalContent === "Update") {
    modalRender = <FormNewMovie />;
  } else if (modalContent === "Casts" || modalContent === "Synopsis") {
    modalRender = <MovieDetails />;
  }

  return (
    <>
      <div className="home-container">
        <Sidebar />
        <div className="mainbar">
          <div className="before-table">
            <h2>Movie List</h2>
            <button onClick={toggleModal} className="btn">
              Add Movie
            </button>
          </div>
          {isLoading ? (
            <img src={loading} alt="" />
          ) : (
            <TableReusable
              data={movies}
              columnHeaders={[
                "No",
                "Name",
                "Poster",
                "Genre",
                "Rating",
                "Synopsis",
                "Trailer",
                "Casts",
                "Created At",
                "Updated At",
                "Author",
                "Action",
              ]}
            >
              <TableRowMovies />
            </TableReusable>
          )}
        </div>
      </div>

      {isModalShow ? (
        <ModalReusable title="Movie" toggleModal={toggleModal}>
          {modalRender}
        </ModalReusable>
      ) : null}
    </>
  );
};

export default HomeView;
