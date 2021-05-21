import React, { useState } from "react";
import styles from "./WorkspaceNavigationBar.module.css";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

import agent from "../../actions/agent";
import OverHeadMessage from "../OverHeadMessage/OverHeadMessage";
import UserPortrait from "../../assets/UserPortrait.svg";
import "./WorkspaceNavigationBar.css";

const mapStateToProps = (state) => {
  return { currentUser: state.userReducer };
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => agent.UserAPI.logout(dispatch),
});

const WorkspaceNavigationBar = ({
  isSideBarOpen,
  subBar,
  headerName,
  handleOnClickToggleSideBar,
  currentUser,
  onLogout,
}) => {
  //  TODO customize a hook inside of OverHeadMessage that will manage itself
  const [isMenuOpen, toggleMenuOpen] = useState(false);

  const handleOnClickToggleMenu = () => {
    toggleMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`${
        subBar
          ? styles.WorkspaceNavigationBar__no_shadow
          : styles.WorkspaceNavigationBar
      }`}
    >
      <div className={`${styles.Main} ${subBar && styles.Main__isProject}`}>
        <CSSTransition
          in={!isSideBarOpen}
          classNames={"hamburger-transition"}
          timeout={500}
          unmountOnExit
        >
          <div
            className={styles.Hamburger}
            onClick={() => handleOnClickToggleSideBar()}
          />
        </CSSTransition>
        <h1 className={styles.Header}>{headerName}</h1>
        <div className={styles.NavigationContent}>
          <img
            src={UserPortrait}
            alt="User Portrait"
            className={styles.UserPortrait}
            onClick={() => {
              handleOnClickToggleMenu();
            }}
          />

          {isMenuOpen ? (
            <div className={styles.Menu}>
              <OverHeadMessage
                closeMenu={() => handleOnClickToggleMenu()}
                width="150"
              >
                <Link to={`/userprofile/${currentUser.username}`}>
                  My Profile
                </Link>
                <Link
                  to="/"
                  onClick={() => {
                    onLogout();
                  }}
                >
                  Log Out
                </Link>
              </OverHeadMessage>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceNavigationBar);
