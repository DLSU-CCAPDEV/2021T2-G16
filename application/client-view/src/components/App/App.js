import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import About from "../About/About";
import agent from "../../actions/agent";
import Error404NotFoundPage from "../Error404NotFoundPage/Error404NotFoundPage";
import HomePage from "../HomePage/HomePage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ProjectNew from "../ProjectNew/ProjectNew";
import ProjectOverviewPage from "../ProjectOverviewPage/ProjectOverviewPage";
import ProjectPage from "../ProjectPage/ProjectPage";
import RegisterPage from "../RegisterPage/RegistrationPage";
import TaskPage from "../TaskPage/TaskPage";
import UserProfilePage from "../UserProfilePage/UserProfilePage";
import WorkRoute from "./WorkRoute/WorkRoute";
import "./App.css";

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (setIsDataLoaded) =>
    agent.ConfigurationAPI.onLoad(dispatch, setIsDataLoaded),
});

const App = ({ currentUser, onLoad }) => {
  const [isSideBarOpen, toggleSideBar] = useState(false);

  useEffect(
    () => {
      onLoad();
    },
    currentUser ? [currentUser.username] : []
  );

  const handleOnClickToggleSideBar = () => {
    toggleSideBar(!isSideBarOpen);
  };

  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/about" exact component={About} />
        <Route path="/registration" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />
        <PrivateRoute>
          <WorkRoute
            path="/homepage"
            exact
            headerName="Homespace"
            handleOnClickToggleSideBar={handleOnClickToggleSideBar}
            isSideBarOpen={isSideBarOpen}
            Component={HomePage}
          />
          <WorkRoute
            path="/projects"
            exact
            headerName="Projects"
            handleOnClickToggleSideBar={handleOnClickToggleSideBar}
            isSideBarOpen={isSideBarOpen}
            Component={ProjectOverviewPage}
          />
          <WorkRoute
            path="/tasks"
            exact
            headerName="My Tasks"
            handleOnClickToggleSideBar={handleOnClickToggleSideBar}
            isSideBarOpen={isSideBarOpen}
            Component={TaskPage}
          />
          <WorkRoute
            path="/userprofile/:username"
            exact
            dynamic
            handleOnClickToggleSideBar={handleOnClickToggleSideBar}
            isSideBarOpen={isSideBarOpen}
            Component={UserProfilePage}
          />
          <WorkRoute
            path="/projects/view/:slug"
            exact
            dynamic
            subBar
            handleOnClickToggleSideBar={handleOnClickToggleSideBar}
            isSideBarOpen={isSideBarOpen}
            Component={ProjectPage}
          />
          <Route path="/projects/new" exact component={ProjectNew} />
        </PrivateRoute>
        <Route component={Error404NotFoundPage} />
      </Switch>
    </HashRouter>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
