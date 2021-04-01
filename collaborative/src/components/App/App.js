import React, { useCallback, useState } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Error404NotFoundPage from "../Error404NotFoundPage/Error404NotFoundPage";
import HomePage from "../HomePage/HomePage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
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

  const WorkRoute = ({ exact, path, Component }) => {
    const history = useHistory();
    const handleNoCurrentUser = useCallback(() => history.push("/login"), [
      history,
    ]);

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

  const renderUserProfilePage = () => {
    return userDatabase.map((user) => (
      <Route
        path={`/userprofile=${user.uniqueID}`}
        key={`userprofile-${user.uniqueID}`}
        render={(props) => <UserProfilePage props={props} userAccount={user} />}
      />
    ));
  };

  const renderProjectPages = () => {
    return projectDatabase.map((project) => (
      <Route
        path={`/projects/project=${formalizeProjectName(project.projectName)}`}
        render={(props) => {
          <ProjectPage props={props} project={project} />;
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
        <WorkRoute path="/homepage" exact Component={HomePage} />
        <WorkRoute path="/projects" exact Component={ProjectOverviewPage} />
        <WorkRoute path="/tasks" exact Component={TaskPage} />
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
