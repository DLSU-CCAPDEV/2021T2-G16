import axios from "axios";
import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./App.module.css";

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
import { formalizeProjectName } from "../../logic";
import "./App.css";

const App = ({ userDatabase, projectDatabase, currentUser }) => {
  const [isSideBarOpen, toggleSideBar] = useState(false);
  const [token, setToken] = useState();

  const handleOnClickToggleSideBar = () => {
    toggleSideBar(!isSideBarOpen);
  };

  //  TODO This should be in server-side
  const renderProjectPages = () => {
    return projectDatabase.map((project) => (
      <WorkRoute
        path={`/projects/project=${formalizeProjectName(project.projectName)}`}
        exact
        headerName={`Project: ${project.projectName}`}
        handleOnClickToggleSideBar={handleOnClickToggleSideBar}
        isSideBarOpen={isSideBarOpen}
        Component={<ProjectPage project={project} />}
      />
    ));
  };

  //  TODO This should be in server-side
  const renderUserProfilePages = () => {
    return userDatabase.map((user) => (
      <WorkRoute
        path={`/userprofile=${user.uniqueID}`}
        exact
        headerName={"User Profile"}
        handleOnClickToggleSideBar={handleOnClickToggleSideBar}
        isSideBarOpen={isSideBarOpen}
        Component={<UserProfilePage userAccount={user} />}
      />
    ));
  };

  const getUserProfile = () => {
    axios
      .get("/api/getUser", {
        params: {
          uniqueID: 1,
        },
      })
      .then((res) => console.log(res));
  };

  getUserProfile();

  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/registration" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/projects/project=new" exact component={ProjectNew} />
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
        {renderProjectPages()}
        {renderUserProfilePages()}
        <Route component={Error404NotFoundPage} />
      </Switch>
    </HashRouter>
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
