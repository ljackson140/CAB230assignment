import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home";
import Rankings from "./components/rankings";
import Search from "./components/search";
import Factors from "./components/factors";
import Register from "./components/register";
import Login from "./components/login";
import NotFound from "./components/notFound";
import NavBar from "./components/navbar";
import "./App.css";


function App() {
  
  return (   
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/home" component= {Home}></Route>
          <Route path="/rankings" component= {Rankings}>
            <Rankings />
          </Route>
          <Route path="/search" component={Search}></Route>
          <Route path="/factors" component={Factors}></Route>
          <Route path="/Register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/notFound" component={NotFound}></Route>
          <Redirect from="/" exact to="/home" />
          <Redirect to="/notFound" />
        </Switch>
      </main>
    </React.Fragment>
  );
  
}

export default App;
