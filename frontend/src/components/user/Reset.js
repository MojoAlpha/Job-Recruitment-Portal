import React, { useState } from "react";
import { signin, isAutheticated, authenticate } from "../../auth";
import { Link, Redirect, useParams } from "react-router-dom";
import { basicAxios } from "../api";
import VerifyMailPopUP from "../popups/VerifyMailPopUp";

export default function Reset({ history }) {
    const {type, token} = useParams();
  const [values, setValues] = useState({
    password: "",
    error: "",
  });

  const [showPopUp, setShowPopUp] = useState(false);

  const { password, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  //for toggling the visibility of popup
  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    basicAxios
      .put(`/auth/forget/${type}/${token}`, {
        newPassword: values.password,
      })
      .then((res) => {
        setValues({password:"",error:""});
        togglePopUp();
      })
      .catch((err) => {
        setValues({password:"",error:err.response.data.err})
      });
  };

  const errorMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error === "" ? "none" : "" }}
    >
      {error}
    </div>
  );
  const signInForm = () => (
    <div
      className="container bg-white"
      style={{
        boxShadow: "0px 3px 6px #00000029",
        padding: "0px 0px 0px 0px",
      }}
    >
      <div className="container mt-5">
        <div className="row px-0">
          <div
            className="col-0 col-md-6 px-0"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/images/form.jpg)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "left",
            }}
          >
            <div
              className="h-100 w-100"
              style={{
                background: "#11B0BB42 0% 0% no-repeat padding-box",
              }}
            ></div>
          </div>
          <div className="col-12 col-md-6">
            <h3 className="font-weight-bold p-5">New Password</h3>
            {errorMessage()}
            <form className="needs-validation mt-5">
              <div className="form-group px-5 pt-3">
                <label>Password</label>
                <input
                  className="form-control"
                  onChange={handleChange("password")}
                  type="password"
                  value={password}
                  required
                  aria-describedby="inputGroupPrepend"
                />
                <div className="invalid-feedback">password cannot be empty</div>
              </div>
              <div className="px-5 mt-5">
                <button
                  onClick={onSubmit}
                  className="btn btn-primary btn-block"
                >
                  Forgot
                </button>
              </div>
            </form>
            <div className="p-5">
              dont have an account yet ? <Link to="/signup">Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/wave.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Link to="/home" style={{ textDecoration: "none" }}>
        <h3 className="row font-weight-bold p-5" style={{ color: "#11B0BB" }}>
          DEVHUB
        </h3>
      </Link>
      {signInForm()}
      {showPopUp ? <VerifyMailPopUP togglePopUp={togglePopUp} /> : ""}
    </div>
  );
}
