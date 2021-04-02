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
  currentUser,
  headerName,
}) => {
  //  TODO customize a hook inside of OverHeadMessage that will manage itself
  const [isMenuOpen, toggleMenuOpen] = useState(false);

  const handleOnClickToggleMenu = () => {
    toggleMenuOpen(!isMenuOpen);
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
      <h1>{headerName}</h1>
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
              <Link to={`/userprofile=${currentUser.uniqueID}`}>
                My Profile
              </Link>
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

const mapStateToProps = (state) => {
  return { currentUser: state.currentUserReducer };
};

export default connect(mapStateToProps, { userLogout })(WorkspaceNavigationBar);
