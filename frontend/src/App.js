import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signup from './components/user/Signup';
import Home from './components/home/index';
import Signin from './components/user/Signin';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/signup" exact component ={Signup} />
        <Route path="/signin" exact component ={Signin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
