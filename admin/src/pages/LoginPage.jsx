import React from "react";
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import * as action from "../store/actions/actions";
import { showError, showSuccess } from "../helpers/swal";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const initialStateObj = useMemo(() => {
    return {
      email: "",
      password: "",
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(action.login(adminObj))
      .then((data) => {
        const { username, accessToken } = data;
        localStorage.setItem("accessToken", accessToken);
        navigate("/");
        showSuccess(`Login Success, ${username}!`);
        setAdminObj(initialStateObj);
      })
      .catch((err) => {
        showError(err);
      });
  };
  const [adminObj, setAdminObj] = useState(initialStateObj);
  return (
    <div className="login-container">
      <h1>PojanFlix</h1>
      <div className="form-container">
        <form onSubmit={submitHandler} className="form-component">
          <input
            type="email"
            placeholder="EMAIL"
            value={adminObj.email}
            onChange={(e) =>
              setAdminObj({ ...adminObj, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="PASSWORD"
            value={adminObj.password}
            onChange={(e) =>
              setAdminObj({ ...adminObj, password: e.target.value })
            }
          />

          <button className="btn" type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
