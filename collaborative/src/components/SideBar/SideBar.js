import React, { useState } from "react";
import styles from "./SideBar.module.css";
import HomePage_icon from "../../assets/HomePage_Icon.svg";
import LinkItem from "./LinkItem/LinkItem";
import Logo from "../Logo/Logo";

const linkItems = [
  {
    to: "/homepage",
    text: "Homespace",
    icon: HomePage_icon,
  },
  {
    to: "/homepage",
    text: "Homespace",
    icon: HomePage_icon,
  },
  {
    to: "/homepage",
    text: "Homespace",
    icon: HomePage_icon,
  },
  {
    to: "/homepage",
    text: "Homespace",
    icon: HomePage_icon,
  },
];

const renderLinkItems = linkItems.map(({ icon, to, text }, key) => {
  return <LinkItem icon={icon} to={to} text={text} key={key} />;
});

const SideBar = () => {
  const [selectedItem, updateSelectedItem] = useState(1);

  return (
    <aside className={styles.SideBar}>
      <div className={styles.Division}>
        <Logo fontSize="25px" />
      </div>
      <hr />
      <div>{renderLinkItems}</div>
    </aside>
  );
};

export default SideBar;
