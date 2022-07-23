import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import TableReusable from "../components/TableReusable";
import ModalReusable from "../components/ModalReusable";
import FormNewGenre from "../components/FormNewGenre";
import TableRowGenres from "../components/TableRowGenres";
import * as action from "../store/actions/actions";
import * as actionType from "../store/actions/actionType";
import loading from "../assets/loading.gif";
import { useState } from "react";
import { showError } from "../helpers/swal";

const GenreView = () => {
  const dispatch = useDispatch();
  const genres = useSelector((store) => store.genreReducer.genres);
  const isModalShow = useSelector((store) => store.modalReducer.isModalShow);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(action.fetchGenre())
      .then(() => {
        setIsLoading(false);
      })
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

  return (
    <>
      <div className="home-container">
        <Sidebar />

        <div className="mainbar">
          <div className="before-table">
            <h2>Genre List</h2>
            <button onClick={toggleModal} className="btn">
              Add Genre
            </button>
          </div>
          {isLoading ? (
            <img src={loading} alt="" />
          ) : (
            <TableReusable
              data={genres}
              columnHeaders={[
                "No",
                "Name",
                "Created At",
                "Updated At",
                "Action",
              ]}
            >
              <TableRowGenres />
            </TableReusable>
          )}
        </div>
      </div>
      {isModalShow ? (
        <ModalReusable title="Genre" toggleModal={toggleModal}>
          <FormNewGenre />
        </ModalReusable>
      ) : null}
    </>
  );
};

export default GenreView;
