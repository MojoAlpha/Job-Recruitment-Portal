import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signup from './components/user/Signup';
import Home from './components/home/index';
import Signin from './components/user/Signin';
import RegisteredUser from './components/registeredUser/index'
import PrivateRouteComp from './auth/PrivateRouteComp';
import PrivateRouteDev from './auth/PrivateRouteDev';
import VacancyDetail from './components/registeredUser/components/VacancyDetail'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        {/* <PrivateRouteComp /> For refrence*/}
        <PrivateRouteDev path="/user" exact component={RegisteredUser} />
        < Route path="/vacancy/details"
          component={
            VacancyDetail
          }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
