import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Error404NotFoundPage from "../Error404NotFoundPage/Error404NotFoundPage";
import HomePage from "../HomePage/HomePage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import WorkspaceNavigationBar from "../WorkspaceNavigationBar/WorkspaceNavigationBar";
import RegisterPage from "../RegisterPage/RegistrationPage";
import SideBar from "../SideBar/SideBar";
import styles from "./App.module.css";
import "./App.css";

const WorkRoute = ({ exact, path, component: Component }) => (
  <Route
    exact={exact}
    path={path}
    render={(props) => (
      <div className={styles.WorkSpace} style={{ height: "100vh" }}>
        <SideBar />
        <div className={styles.WorkSpace_Content}>
          <WorkspaceNavigationBar />
          <Component props={props} />
        </div>
      </div>
    )}
  />
);

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/registration" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />
        <WorkRoute path="/homepage" exact component={HomePage} />
        <Route component={Error404NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
