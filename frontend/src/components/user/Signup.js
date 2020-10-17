import React, { useState } from 'react'
import { userSignup } from '../../auth'
import { Link } from 'react-router-dom';
import PopUp from './PopUp'

export default function Signup() {

    const [values, setValues] = useState({
        //initializing the state of the signup form
        name: "",
        email: "",
        password: "",
        error: false,
        success: true,
        type: "" /*
                    U: normal user
                    C: company
                    */
    })

    const [showPopUp, setShowPopUp] = useState(false)

    //deconstructing the state values
    const { name, email, password, error, success, type } = values;

    //handling the change of any input fields 
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    //for toggling the visibility of popup
    const togglePopUp = () => {
        setShowPopUp(!showPopUp)
    }

    const onSubmit = event => {
        event.preventDefault();

        userSignup({ name, email, password, type })
            .then(res => {
                console.log(res);
                // data.err is custom message written in backend
                if (!res.success) {
                    setValues({ ...values, error: res.err, success: false });

                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: false,
                        success: true,
                        type: ""
                    })
                    //showing popup once all details are accepted
                    togglePopUp()
                }
            })
            .catch(console.log("Error in signup"));
    }

    const errorMessage = () => (
        <div
            className="alert alert-danger"
            style={{ display: !error ? "none" : "" }}
        >
            {error}
        </div>
    )
    const signUpForm = () => (
        <div className="container bg-white" style={{
            boxShadow: "0px 3px 6px #00000029",
            padding: "0px 0px 0px 0px",
        }}
        >
            <div className="container mt-5">
                <div className="row px-0">
                    <div className="col-0 col-md-6 px-0" style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/images/form.jpg)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "left"
                    }}>
                        <div className="h-100 w-100" style={{
                            background: "#11B0BB42 0% 0% no-repeat padding-box"
                        }}>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3 className="font-weight-bold p-5">Welcome Back</h3>
                        {errorMessage()}
                        <form className="px-5">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    className="form-control"
                                    onChange={handleChange("name")}
                                    type="text"
                                    value={name}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    onChange={handleChange("email")}
                                    type="email"
                                    value={email}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    className="form-control"
                                    onChange={handleChange("password")}
                                    type="password"
                                    value={password}
                                    name="type"
                                />
                            </div>
                            <div className="form-group d-flex justify-content-around">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        onChange={handleChange("type")}
                                        type="radio"
                                        value="U"
                                        name="type"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        className="form-control"
                                        onChange={handleChange("password")}
                                        type="password"
                                        value={password}
                                        name="type"
                                    />
                                </div>
                                <div className="form-group d-flex justify-content-around">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            onChange={handleChange("type")}
                                            type="radio"
                                            value="U"
                                            name="type"
                                        />
                                        <label>Developer</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            onChange={handleChange("type")}
                                            type="radio"
                                            value="C"
                                            name="type"
                                        />
                                        <label>Company</label>
                                    </div>
                                </div>
                                <button onClick={onSubmit} className="btn btn-primary btn-block">
                                    Sign Up
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

    )
    return (
        <div style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/wave.svg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh"
        }}>
            <Link to="/home" style={{ textDecoration: "none" }}>
                <h3 className="row font-weight-bold p-5" style={{ color: "#11B0BB" }}>
                    DEVHUB
              </h3>
            </Link>
            {signUpForm()}
        </div>
    )
}