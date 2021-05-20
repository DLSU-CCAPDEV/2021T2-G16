import axios from "axios";
import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import agent from "../../actions/agent";
import Error404NotFoundPage from "../Error404NotFoundPage/Error404NotFoundPage";
import HomePage from "../HomePage/HomePage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import ProjectNew from "../ProjectNew/ProjectNew";
import ProjectOverviewPage from "../ProjectOverviewPage/ProjectOverviewPage";
import ProjectPage from "../ProjectPage/ProjectPage";
import RegisterPage from "../RegisterPage/RegistrationPage";
import TaskPage from "../TaskPage/TaskPage";
import UserProfilePage from "../UserProfilePage/UserProfilePage";
import WorkRoute from "./WorkRoute/WorkRoute";
import "./App.css";

const mapStateToProps = (state) => {
  return { currentUser: state.userReducer };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (setIsDataLoaded) =>
    agent.ConfigurationAPI.onLoad(dispatch, setIsDataLoaded),
});

const App = ({ currentUser, onLoad }) => {
  const [isSideBarOpen, toggleSideBar] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(
    () => {
      onLoad(setIsDataLoaded);
    },
    currentUser ? [currentUser.username] : []
  );

  const handleOnClickToggleSideBar = () => {
    toggleSideBar(!isSideBarOpen);
  };

  //  TODO Request specific page of the Project
  // const renderProjectPages = () => {
  //   <WorkRoute
  //     path={`/projects/project`}
  //     exact
  //     headerName={`Project: ${project.projectName}`}
  //     handleOnClickToggleSideBar={handleOnClickToggleSideBar}
  //     isSideBarOpen={isSideBarOpen}
  //     Component={<ProjectPage />}
  //   />;
  // };

  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/registration" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/projects/project=new" exact component={ProjectNew} />
        {isDataLoaded ? (
          <>
            <WorkRoute
              path="/homepage"
              exact
              headerName="Homespace"
              handleOnClickToggleSideBar={handleOnClickToggleSideBar}
              isSideBarOpen={isSideBarOpen}
              Component={<HomePage />}
            />
            <WorkRoute
              path="/projects"
              exact
              headerName="Projects"
              handleOnClickToggleSideBar={handleOnClickToggleSideBar}
              isSideBarOpen={isSideBarOpen}
              Component={<ProjectOverviewPage />}
            />
            <WorkRoute
              path="/tasks"
              exact
              headerName="My Tasks"
              handleOnClickToggleSideBar={handleOnClickToggleSideBar}
              isSideBarOpen={isSideBarOpen}
              Component={<TaskPage />}
            />
            <WorkRoute
              path={`/userprofile/:username`}
              exact
              headerName={"User Profile"}
              handleOnClickToggleSideBar={handleOnClickToggleSideBar}
              isSideBarOpen={isSideBarOpen}
              Component={<UserProfilePage />}
            />
            {/* {renderProjectPages()} */}
          </>
        ) : null}
        <Route component={Error404NotFoundPage} />
      </Switch>
    </HashRouter>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
