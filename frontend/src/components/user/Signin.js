import React, {useState} from 'react'
import { signin, isAutheticated, authenticate } from '../../auth'
import { Link, Redirect } from 'react-router-dom';

export default function Signin() {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: false,
        didRedirect: false,
      });

    const { email, password, error, didRedirect } = values;
    const { user } = isAutheticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false,[name]: event.target.value });
      };

    const onSubmit = event => {
        // event.preventDefault();

        signin({ email, password })
          .then(data => {
              console.log("data: "+JSON.stringify(data))
            if (data.err) {
              setValues({ ...values, error: data.err,loading: false });
            } else {
              authenticate(data, () => {
                setValues({
                  ...values,
                  didRedirect: true
                });
              });
            }
          })
          .catch(console.log("signin request failed"));
      };

    const performRedirect = () => {
        //TODO: do a redirect here
        if (didRedirect) {
          if (user && user.role === 1) {
            return <p>redirect to user dashboard</p>;
          } else if(user && user.role === 2) {
            return <p>redirect to user dashboard</p>;
          } else{
              return <p></p>
          }
        }
        if (isAutheticated()) {
          return <Redirect to="/" />;
        }
      };

    const errorMessage = ()=>(
        <div
            className="alert alert-danger"
            style={{ display: !error? "none":""}}
        >
            {error}
        </div>
    )
    const signInForm = () => (
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
                    <form className="needs-validation">
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                className="form-control"
                                onChange={handleChange("email")}
                                type="email"
                                value={email}
                                required
                                aria-describedby="inputGroupPrepend"
                            />
                            <div className="invalid-feedback">Email cannot be empty</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                className="form-control"
                                onChange={handleChange("password")}
                                type="password"
                                value={password}
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <div class="invalid-feedback">Password cannot be empty</div>
                        </div>
                        <button onClick={onSubmit} className="btn btn-primary btn-block">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
            </div>    
        </div>
    )
    return (
        <div>
            {performRedirect()}
            {signInForm()}
        </div>
    )
}
