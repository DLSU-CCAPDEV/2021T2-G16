import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Error404NotFoundPage from "../Error404NotFoundPage/Error404NotFoundPage";
import HomePage from "../HomePage/HomePage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import ProjectPage from "../ProjectPage/ProjectPage";
import RegisterPage from "../RegisterPage/RegistrationPage";
import SideBar from "../SideBar/SideBar";
import TaskPage from "../TaskPage/TaskPage";
import UserProfilePage from "../UserProfilePage/UserProfilePage";
import WorkspaceNavigationBar from "../WorkspaceNavigationBar/WorkspaceNavigationBar";
import styles from "./App.module.css";
import "./App.css";

const App = ({ userDatabase }) => {
  const [isSideBarOpen, toggleSideBar] = useState(false);

  const handleOnClickToggleSideBar = () => {
    toggleSideBar(!isSideBarOpen);
  };

  const WorkRoute = ({ exact, path, Component }) => (
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
  );

  const renderUserProfilePage = () => {
    return userDatabase.map((item) => (
      <Route
        path={`/userprofile=${item.uniqueID}`}
        key={`userprofile-${item.uniqueID}`}
        render={(props) => (
          <UserProfilePage
            props={props}
            userAccount={userDatabase.find(
              (account) => account.uniqueID === item.uniqueID
            )}
          />
        )}
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
        <WorkRoute path="/projects" exact Component={ProjectPage} />
        <WorkRoute path="/tasks" exact Component={TaskPage} />
        {renderUserProfilePage()}
        <Route component={Error404NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return { userDatabase: state.userReducer };
};

export default connect(mapStateToProps)(App);
