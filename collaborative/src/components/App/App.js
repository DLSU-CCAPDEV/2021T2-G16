import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
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

  const WorkRoute = ({ exact, path, headerName, Component }) => {
    return currentUser ? (
      <Route
        exact={exact}
        path={path}
        render={(props) => (
          <div className={styles.WorkSpace} style={{ height: "100vh" }}>
            {isSideBarOpen ? (
              <SideBar handleOnClick={handleOnClickToggleSideBar} />
            ) : null}
            <div className={styles.WorkSpace_Content}>
              <WorkspaceNavigationBar
                handleOnClickToggleSideBar={handleOnClickToggleSideBar}
                headerName={headerName}
                isSideBarOpen={isSideBarOpen}
              />
              <div className={styles.Content_Main}>
                <Component props={props} />
              </div>
            </div>
          </div>
        )}
      />
    ) : null;
  };

  //  TODO refactor this function to fit with WorkRoute
  const renderUserProfilePage = () => {
    return userDatabase.map((user) => (
      <Route
        exact
        path={`/userprofile=${user.uniqueID}`}
        key={`userprofile-${user.uniqueID}`}
        render={(props) => {
          return (
            <div className={styles.WorkSpace} style={{ height: "100vh" }}>
              {isSideBarOpen ? (
                <SideBar handleOnClick={handleOnClickToggleSideBar} />
              ) : null}
              <div className={styles.WorkSpace_Content}>
                <WorkspaceNavigationBar
                  handleOnClickToggleSideBar={handleOnClickToggleSideBar}
                  isSideBarOpen={isSideBarOpen}
                  headerName={"User Profile"}
                />
                <div className={styles.Content_Main}>
                  <UserProfilePage props={props} userAccount={user} />
                </div>
              </div>
            </div>
          );
        }}
      />
    ));
  };

  const renderProjectPages = () => {
    return projectDatabase.map((project) => (
      <Route
        exact
        path={`/projects/project=${formalizeProjectName(project.projectName)}`}
        key={`project-${formalizeProjectName(project.projectName)}`}
        render={(props) => {
          return (
            <div className={styles.WorkSpace} style={{ height: "100vh" }}>
              {isSideBarOpen ? (
                <SideBar handleOnClick={handleOnClickToggleSideBar} />
              ) : null}
              <div className={styles.WorkSpace_Content}>
                <WorkspaceNavigationBar
                  handleOnClickToggleSideBar={handleOnClickToggleSideBar}
                  isSideBarOpen={isSideBarOpen}
                  headerName={`Project: ${project.projectName}`}
                />
                <div className={styles.Content_Main}>
                  <ProjectPage props={props} project={project} />
                </div>
              </div>
            </div>
          );
        }}
      />
    ));
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/registration" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/projects/project=new" exact component={ProjectNew} />
        <WorkRoute
          path="/homepage"
          exact
          Component={HomePage}
          headerName="Homespace"
        />
        <WorkRoute
          path="/projects"
          exact
          Component={ProjectOverviewPage}
          headerName="Projects"
        />
        <WorkRoute
          path="/tasks"
          exact
          Component={TaskPage}
          headerName="My Tasks"
        />
        {renderUserProfilePage()}
        {renderProjectPages()}
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
