import React, { useState } from "react";
import styles from "./SideBar.module.css";
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
  {
    to: "/homepagedadwad",
    text: "Homadwwaespace",
    icon: HomePage_icon,
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

const SideBar = () => {
  return (
    <aside className={styles.SideBar}>
      <div className={styles.Division}>
        <Logo fontSize="25px" />
      </div>
      <hr />
      <div>{renderLinkItems(useLocation().pathname)}</div>
    </aside>
  );
};

export default SideBar;
