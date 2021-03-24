import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Error404NotFoundPage from "../Error404NotFoundPage/Error404NotFoundPage";
import HomePage from "../HomePage/HomePage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import ProjectPage from "../ProjectPage/ProjectPage";
import RegisterPage from "../RegisterPage/RegistrationPage";
import SideBar from "../SideBar/SideBar";
import TaskPage from "../TaskPage/TaskPage";
import WorkspaceNavigationBar from "../WorkspaceNavigationBar/WorkspaceNavigationBar";
import styles from "./App.module.css";
import "./App.css";

const App = () => {
  const [isSideBarOpen, toggleSideBar] = useState(false);

  const handleOnClick = () => {
    toggleSideBar(!isSideBarOpen);
  };

  const WorkRoute = ({ exact, path, Component }) => (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <div className={styles.WorkSpace} style={{ height: "100vh" }}>
          {isSideBarOpen ? <SideBar handleOnClick={handleOnClick} /> : null}
          <div className={styles.WorkSpace_Content}>
            <WorkspaceNavigationBar
              handleOnClick={handleOnClick}
              isSideBarOpen={isSideBarOpen}
            />
            <Component props={props} />
          </div>
        </div>
      )}
    />
  );

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/registration" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />
        <WorkRoute path="/homepage" exact Component={HomePage} />
        <WorkRoute path="/projects" exact Component={ProjectPage} />
        <WorkRoute path="/tasks" exact Component={TaskPage} />
        <Route component={Error404NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
