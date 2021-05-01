import React, { useState } from "react";
import styles from "./SideBar.module.css";
import Hamburger_Close__Active from "../../assets/Hamburger_Close__Active.svg";
import Hamburger_Close__Inactive from "../../assets/Hamburger_Close__Inactive.svg";
import HomePage_icon from "../../assets/HomePage_Icon.svg";
import ProjectPage_icon from "../../assets/ProjectPage_Icon.svg";
import TasksPage_icon from "../../assets/TasksPage_Icon.svg";
import LinkItem from "./LinkItem/LinkItem";
import Logo from "../Logo/Logo";
import { useLocation } from "react-router";

const linkItems = [
  {
    to: "/homepage",
    text: "Homespace",
    icon: HomePage_icon,
  },
  {
    to: "/projects",
    text: "Projects",
    icon: ProjectPage_icon,
  },
  {
    to: "/tasks",
    text: "My Tasks",
    icon: TasksPage_icon,
  },
];

const renderLinkItems = (pathname) =>
  linkItems.map(({ icon, to, text }, key) => {
    return (
      <LinkItem
        icon={icon}
        to={to}
        text={text}
        key={key}
        isSelected={pathname === to}
      />
    );
  });

const SideBar = ({ handleOnClick }) => {
  const [isHoveredOn, setHoveredOn] = useState(false);

  return (
    <aside className={styles.SideBar}>
      <div className={styles.TopHeader}>
        <div className={`${styles.Header} ${styles.Division}`}>
          <Logo fontSize="20px" justText />
          <img
            src={
              isHoveredOn ? Hamburger_Close__Active : Hamburger_Close__Inactive
            }
            alt="Grilled Whopper"
            className={styles.Hamburger_Close}
            onClick={handleOnClick}
            onMouseEnter={() => setHoveredOn(true)}
            onMouseLeave={() => setHoveredOn(false)}
          />
        </div>
        <hr />
      </div>
      <div>{renderLinkItems(useLocation().pathname)}</div>
    </aside>
  );
};

export default SideBar;
