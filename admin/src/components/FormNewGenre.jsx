import React from "react";
import * as action from "../store/actions/actions";
import * as actionType from "../store/actions/actionType";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../helpers/swal";
import loading from "../assets/loading.gif";

const FormNewGenre = () => {
  const dispatch = useDispatch();
  const genre = useSelector((store) => store.genreReducer.genre);
  const modalContent = useSelector((store) => store.modalReducer.modalContent);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (modalContent === "Create") {
      setName("");
    } else if (modalContent === "Update") {
      setName(genre.name);
    }
  }, [modalContent, genre]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (modalContent === "Create") {
      dispatch(action.addGenre(name))
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
      dispatch(action.editGenre(genre.id, name))
        .then(() => {
          setIsLoading(false);
          dispatch({
            type: actionType.TOGGLE_MODAL,
          });
          showSuccess("Success edit genre!");
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
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="box">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
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

export default FormNewGenre;
