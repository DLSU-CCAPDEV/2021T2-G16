import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Error404NotFoundPage from "../Error404NotFoundPage/Error404NotFoundPage";
import HomePage from "../HomePage/HomePage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import WorkspaceNavigationBar from "../WorkspaceNavigationBar/WorkspaceNavigationBar";
import RegisterPage from "../RegisterPage/RegistrationPage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/registration" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path={["/homepage"]} exact component={WorkspaceNavigationBar} />
        <Route path="/homepage" exact component={HomePage} />
        <Route component={Error404NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
