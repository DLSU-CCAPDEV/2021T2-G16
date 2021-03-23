import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import WorkspaceNavigationBar from "../WorkspaceNavigationBar/WorkspaceNavigationBar";
import RegisterPage from "../RegisterPage/RegistrationPage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact component={LandingPage} />
        <Route path="/registration" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path={["/homepage"]} exact component={WorkspaceNavigationBar} />
        <Route path="/homepage" exact component={HomePage} />
      </div>
    </BrowserRouter>
  );
};

export default App;
