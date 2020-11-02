import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./components/user/Signup";
import Home from "./components/home/index";
import Signin from "./components/user/Signin";
import RegisteredUser from "./components/registeredUser/index";
import PrivateRouteComp from "./auth/PrivateRouteComp";
import PrivateRouteDev from "./auth/PrivateRouteDev";
import VacancyDetail from "./components/registeredUser/components/VacancyDetail";
import Verify from "./auth/Verify";
import Forget from "./components/user/Forget";
import Reset from "./components/user/Reset";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/forget" component={Forget} />
          <Route path="/auth/verify/:type/:token" component={Verify}/>
          <Route path="/auth/forget/:type/:token" component={Reset}/>
          <Route path="/user" component={RegisteredUser} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;