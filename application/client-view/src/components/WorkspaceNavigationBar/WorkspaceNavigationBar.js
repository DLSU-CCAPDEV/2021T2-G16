import React, { useEffect, useState } from "react";
import styles from "./WorkspaceNavigationBar.module.css";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

import AddMember_Icon from "../../assets/AddMember_Icon.svg";
import OverHeadMessage from "../OverHeadMessage/OverHeadMessage";
import UserPortrait from "../../assets/UserPortrait.svg";
import SearchBar from "../SearchBar/SearchBar";
import "./WorkspaceNavigationBar.css";

const mapStateToProps = (state) => {
  return { currentUser: state.userReducer };
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch({ type: "USER_LOGOUT" }),
});

const WorkspaceNavigationBar = ({
  isSideBarOpen,
  isProject,
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

  useEffect(() => {
    console.log(currentUser);
  }, []);

  return (
    <nav className={styles.WorkspaceNavigationBar}>
      <div className={`${styles.Main} ${isProject && styles.Main__isProject}`}>
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
                <Link to={`/userprofile?username=${currentUser.username}`}>
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
      {isProject && (
        <div className={styles.ProjectBar}>
          <div className={styles.ProjectBar_Members}>
            <span>Project Members: </span>
            <img src={UserPortrait} alt="User" title="You" />
            <img src={UserPortrait} alt="User" title="Alyssa" />
            <img src={UserPortrait} alt="User" title="Test User" />
            <img
              src={AddMember_Icon}
              alt="Add A New Member"
              title="Add a New Member"
            />
          </div>
          <div className={styles.ProjectBar_SearchBar}>
            <SearchBar />
          </div>
        </div>
      )}
    </nav>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceNavigationBar);
