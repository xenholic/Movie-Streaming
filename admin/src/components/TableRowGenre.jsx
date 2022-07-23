import React from "react";
import * as action from "../store/actions/actions";
import * as actionType from "../store/actions/actionType";
import { useDispatch } from "react-redux";
import { useState } from "react";
import loading from "../assets/loading.gif";
import { showError, showSuccess } from "../helpers/swal";

const TableRowGenres = ({ datum, idx }) => {
  const dispatch = useDispatch();
  // console.log(datum);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    setIsLoading(true);
    dispatch(action.deleteGenre(id))
      .then(() => showSuccess("Success delete genre!"))
      .catch((err) => showError(err))
      .finally(() => setIsLoading(false));
  };

  const clickEdit = (id) => {
    setIsLoading(true);
    dispatch(action.fetchOneGenre(id))
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
          {" "}
          <img src={loading} alt="" style={{ height: "60px" }} />
        </td>
      ) : (
        <>
          <td>{idx + 1}</td>
          <td className="not-center">{datum.name}</td>
          <td>{formatDate(datum.createdAt)}</td>
          <td>{formatDate(datum.updatedAt)}</td>
          <td>
            <button
              onClick={() => clickEdit(datum.id)}
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

export default TableRowGenres;
