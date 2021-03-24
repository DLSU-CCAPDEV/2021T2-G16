import React from "react";
import { useLocation } from "react-router-dom";
import Hamburger from "../../assets/Hamburger.svg";
import UserPortrait from "../../assets/UserPortrait.svg";
import styles from "./WorkspaceNavigationBar.module.css";

const WorkspaceNavigationBar = ({ handleOnClick, isSideBarOpen }) => {
  const getHeaderLine = (location) => {
    switch (location) {
      case "/homepage":
        return "Homepage";
      default:
        return "[Unnamed Header]";
    }
  };

  return (
    <nav className={styles.WorkspaceNavigationBar}>
      {isSideBarOpen ? null : (
        <img
          src={Hamburger}
          alt="Cheese Hamburger"
          className={styles.Hamburger}
          onClick={handleOnClick}
        />
      )}
      <h1>{getHeaderLine(useLocation().pathname)}</h1>
      <div className={styles.NavigationContent}>
        <img
          src={UserPortrait}
          alt="User Portrait"
          className={styles.UserPortrait}
        />
      </div>
    </nav>
  );
};

export default WorkspaceNavigationBar;
