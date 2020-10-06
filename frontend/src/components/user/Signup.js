import React, { useState } from 'react'
import { userSignup } from '../../auth'
import { Link } from 'react-router-dom';

export default function Signup() {

    const [values, setValues] = useState({
        //initializing the state of the signup form
        name:"",
        email:"",
        password:"",
        error:[],
        success:true,
        role:1 /*1-developer
                 2-company*/
    })

    //deconstructing the state values
    const { name,email,password,error,success,role } = values; 

    //handling the change of any input fields 
    const handleChange = name => event => {
        setValues({ ...values, error: [], [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        
        if(role===1){
            userSignup({ name,email,password })
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
                            error: [],
                            success :true,
                            role :1
                        })
                    }
                })
                .catch(console.log("Error in signup"));
        }
        else if(role===2){
            //TODO :company signup
        }
    }

    const errors = error.map((err)=>(
        <p key={err}>{err.msg}</p>
    ))
    const errorMessage = ()=>(
        <div
            className="alert alert-danger"
            style={{ display: success? "none":""}}
        >
            {errors}
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
                            />
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
