import axios from "axios";
import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

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

const App = () => {
  const [isSideBarOpen, toggleSideBar] = useState(false);

  const handleOnClickToggleSideBar = () => {
    toggleSideBar(!isSideBarOpen);
  };

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
          isAuthenticated
        />
        <WorkRoute
          path="/projects"
          exact
          headerName="Projects"
          handleOnClickToggleSideBar={handleOnClickToggleSideBar}
          isSideBarOpen={isSideBarOpen}
          Component={<ProjectOverviewPage />}
          isAuthenticated
        />
        <WorkRoute
          path="/tasks"
          exact
          headerName="My Tasks"
          handleOnClickToggleSideBar={handleOnClickToggleSideBar}
          isSideBarOpen={isSideBarOpen}
          Component={<TaskPage />}
          isAuthenticated
        />
        {/* <WorkRoute
          path={`/userprofile=${user.uniqueID}`}
          exact
          headerName={"User Profile"}
          handleOnClickToggleSideBar={handleOnClickToggleSideBar}
          isSideBarOpen={isSideBarOpen}
          Component={<UserProfilePage userAccount={user} />}
          isAuthenticated
        />
        <WorkRoute
          path={`/projects/project=${formalizeProjectName(
            project.projectName
          )}`}
          exact
          headerName={`Project: ${project.projectName}`}
          handleOnClickToggleSideBar={handleOnClickToggleSideBar}
          isSideBarOpen={isSideBarOpen}
          Component={<ProjectPage project={project} />}
        /> */}
        <Route component={Error404NotFoundPage} />
      </Switch>
    </HashRouter>
  );
};

export default App;
