import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Hamburger from "../../assets/Hamburger.svg";
import OverHeadMessage from "../OverHeadMessage/OverHeadMessage";
import UserPortrait from "../../assets/UserPortrait.svg";
import { userLogout } from "../../actions";
import styles from "./WorkspaceNavigationBar.module.css";

const WorkspaceNavigationBar = ({
  isSideBarOpen,
  userLogout,
  handleOnClickToggleSideBar,
}) => {
  //  TODO customize a hook inside of OverHeadMessage that will manage itself
  const [isMenuOpen, toggleMenuOpen] = useState(false);

  const handleOnClickToggleMenu = () => {
    toggleMenuOpen(!isMenuOpen);
  };

  const getHeaderLine = (location) => {
    switch (location) {
      case "/homepage":
        return "Homepage";
      case "/projects":
        return "Projects";
      case "/tasks":
        return "My Tasks";
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
          onClick={() => handleOnClickToggleSideBar()}
        />
      )}
      <h1>{getHeaderLine(useLocation().pathname)}</h1>
      <div className={styles.NavigationContent}>
        <img
          src={UserPortrait}
          alt="User Portrait"
          className={styles.UserPortrait}
          onClick={() => {
            if (!isMenuOpen) {
              handleOnClickToggleMenu();
            }
          }}
        />
        {isMenuOpen ? (
          <div className={styles.Menu}>
            <OverHeadMessage
              width="100"
              closeMenu={() => handleOnClickToggleMenu()}
            >
              <Link
                to="/"
                onClick={() => {
                  userLogout();
                }}
              >
                Log Out
              </Link>
            </OverHeadMessage>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default connect(null, { userLogout })(WorkspaceNavigationBar);
