import React from "react";
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import * as action from "../store/actions/actions";
import { showError, showSuccess } from "../helpers/swal";

const AddAdminView = () => {
  const dispatch = useDispatch();
  const initialStateObj = useMemo(() => {
    return {
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    };
  }, []);
  const [adminObj, setAdminObj] = useState(initialStateObj);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(action.addAdmin(adminObj))
      .then(() => {
        showSuccess("Success add new admin!");
        setAdminObj(initialStateObj);
      })
      .catch((err) => {
        showError(err);
      });
  };
  return (
    <div className="home-container">
      <Sidebar />
      <div className="mainbar left">
        <h1>Register New Admin</h1>
        <form onSubmit={submitHandler}>
          <div className="box">
            <label htmlFor="username">Username</label>
            <input
              value={adminObj.username}
              onChange={(e) =>
                setAdminObj({ ...adminObj, username: e.target.value })
              }
              type="text"
              id="username"
            />
          </div>
          <div className="box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={adminObj.email}
              onChange={(e) =>
                setAdminObj({ ...adminObj, email: e.target.value })
              }
            />
          </div>
          <div className="box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={adminObj.password}
              onChange={(e) =>
                setAdminObj({ ...adminObj, password: e.target.value })
              }
            />
          </div>
          <div className="box">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={adminObj.phoneNumber}
              onChange={(e) =>
                setAdminObj({ ...adminObj, phoneNumber: e.target.value })
              }
            />
          </div>
          <div className="box">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={adminObj.address}
              onChange={(e) =>
                setAdminObj({ ...adminObj, address: e.target.value })
              }
            />
          </div>
          <button className="btn" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdminView;
