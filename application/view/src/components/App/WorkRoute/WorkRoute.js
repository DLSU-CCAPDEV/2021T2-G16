import React from "react";
import { CSSTransition } from "react-transition-group";
import { Redirect, Route } from "react-router-dom";
import styles from "./WorkRoute.module.css";

import SideBar from "../../SideBar/SideBar";
import WorkspaceNavigationBar from "../../WorkspaceNavigationBar/WorkspaceNavigationBar";
import "./WorkRoute.css";

//  TODO Check if it is possible to detach Component from the layout
//  TODO Check if this component can latch to its parent's hook  for 'isSideBarOpen' state
const WorkRoute = ({
  path,
  exact,
  headerName,
  handleOnClickToggleSideBar,
  isSideBarOpen,
  Component,
  isAuthenticated,
}) => {
  return isAuthenticated ? (
    <Route exact={exact} path={path}>
      <div className={styles.WorkSpace} style={{ height: "100vh" }}>
        <CSSTransition
          in={isSideBarOpen}
          classNames={"sidebar-transition"}
          timeout={500}
          unmountOnExit
        >
          <SideBar handleOnClick={handleOnClickToggleSideBar} />
        </CSSTransition>
        <div className={styles.WorkSpace_Content}>
          <WorkspaceNavigationBar
            handleOnClickToggleSideBar={() => {
              console.log("clicked");
              handleOnClickToggleSideBar();
            }}
            headerName={headerName}
            isSideBarOpen={isSideBarOpen}
          />
          <div className={styles.Content_Main}>{Component}</div>
        </div>
      </div>
    </Route>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
};

export default WorkRoute;
