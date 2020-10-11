import React, { useState } from 'react'
import { userSignup } from '../../auth'
import { Link } from 'react-router-dom';

export default function Signup() {

    const [values, setValues] = useState({
        //initializing the state of the signup form
        name:"",
        email:"",
        password:"",
        error:false,
        success:true,
        type : "" /*
                    U: normal user
                    C: company
                    */
    })

    //deconstructing the state values
    const { name,email,password,error,success,type } = values; 

    //handling the change of any input fields 
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        
        userSignup({ name,email,password,type })
            .then(res => {
                console.log(res);
                // data.err is custom message written in backend
                if(!res.success)  
                setValues({ ...values, error: res.err, success: false });
                else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: false,
                        success :true,
                        type :""
                    })
                }
            })
            .catch(console.log("Error in signup"));
    }

    const errorMessage = ()=>(
        <div
            className="alert alert-danger"
            style={{ display: !error? "none":""}}
        >
            {error}
        </div>
    )
    const signUpForm = () => (
        <div className="container-fluid">
            <Link to="/home" style={{textDecoration:"none"}}>
            <h3 className="row font-weight-bold p-5" style={{color: "#11B0BB"}}>
                DEVHUB
            </h3>
            </Link>
            <div className="container mt-5">
                <div className="row">
                <div className="col-6">
                    <img src="" alt="Some random image"/>
                </div>
                <div className="col-6">
                    {errorMessage()}
                    <form>
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
                    </form>
                    <div className="text-center pt-3">
                        already have an account? <Link to="/signin">Login</Link>
                    </div>
                </div>
            </div>
            </div>    
        </div>
    )
    return (
        <div>
            {signUpForm()}
            {/* <p className="text-center"> {JSON.stringify(values)} </p> */}
        </div>
    )
}
