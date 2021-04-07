import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Error404NotFoundPage from "../Error404NotFoundPage/Error404NotFoundPage";
import HomePage from "../HomePage/HomePage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import ProjectNew from "../ProjectNew/ProjectNew";
import ProjectOverviewPage from "../ProjectOverviewPage/ProjectOverviewPage";
import ProjectPage from "../ProjectPage/ProjectPage";
import RegisterPage from "../RegisterPage/RegistrationPage";
import SideBar from "../SideBar/SideBar";
import TaskPage from "../TaskPage/TaskPage";
import UserProfilePage from "../UserProfilePage/UserProfilePage";
import WorkspaceNavigationBar from "../WorkspaceNavigationBar/WorkspaceNavigationBar";
import { formalizeProjectName } from "../../logic";
import styles from "./App.module.css";
import "./App.css";

const App = ({ userDatabase, projectDatabase, currentUser }) => {
  const [isSideBarOpen, toggleSideBar] = useState(false);

  const handleOnClickToggleSideBar = () => {
    toggleSideBar(!isSideBarOpen);
  };

  // TODO check if this can be wired with a component rather than a function
  const routeNavigationLayout = (path, exact, headerName, Component) => {
    return (
      <Route exact={exact} path={path}>
        <div className={styles.WorkSpace} style={{ height: "100vh" }}>
          <CSSTransition
            in={isSideBarOpen}
            classNames={"example"}
            timeout={500}
            unmountOnExit
            onEnter={() => toggleSideBar(true)}
            onExit={() => toggleSideBar(false)}
          >
            <SideBar handleOnClick={handleOnClickToggleSideBar} />
          </CSSTransition>
          <div className={styles.WorkSpace_Content}>
            <WorkspaceNavigationBar
              handleOnClickToggleSideBar={handleOnClickToggleSideBar}
              headerName={headerName}
              isSideBarOpen={isSideBarOpen}
            />
            <div className={styles.Content_Main}>
              <Component />
            </div>
          </div>
        </div>
      </Route>
    );
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/registration" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/projects/project=new" exact component={ProjectNew} />
        {routeNavigationLayout("/homepage", true, "Homespace", HomePage)}
        {routeNavigationLayout(
          "/projects",
          true,
          "Projects",
          ProjectOverviewPage
        )}
        {routeNavigationLayout("/tasks", true, "My Tasks", TaskPage)}
        <Route component={Error404NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    userDatabase: state.userReducer,
    projectDatabase: state.projectReducer,
    currentUser: state.currentUserReducer,
  };
};

export default connect(mapStateToProps)(App);
