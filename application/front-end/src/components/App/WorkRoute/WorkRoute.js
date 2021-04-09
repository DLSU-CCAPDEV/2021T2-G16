import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Route } from "react-router-dom";
import styles from "./WorkRoute.module.css";

import SideBar from "../../SideBar/SideBar";
import WorkspaceNavigationBar from "../../WorkspaceNavigationBar/WorkspaceNavigationBar";
import "./WorkRoute.css";

const WorkRoute = ({
  path,
  exact,
  headerName,
  handleOnClickToggleSideBar,
  isSideBarOpen,
  Component,
}) => {
  return (
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
          <div className={styles.Content_Main}>
            <Component />
          </div>
        </div>
      </div>
    </Route>
  );
};

export default WorkRoute;
