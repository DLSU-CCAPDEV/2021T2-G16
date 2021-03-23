import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Error404NotFoundPage from "../Error404NotFoundPage/Error404NotFoundPage";
import HomePage from "../HomePage/HomePage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import WorkspaceNavigationBar from "../WorkspaceNavigationBar/WorkspaceNavigationBar";
import RegisterPage from "../RegisterPage/RegistrationPage";
import SideBar from "../SideBar/SideBar";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={LandingPage} />
      <Route path="/registration" exact component={RegisterPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path={["/homepage"]} component={WorkspaceNavigationBar} />
      <Route path={["/homepage"]} component={SideBar} />
      <Route path="/homepage" exact component={HomePage} />
    </BrowserRouter>
  );
};

export default App;
