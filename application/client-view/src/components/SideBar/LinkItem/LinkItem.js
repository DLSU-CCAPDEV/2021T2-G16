import React from "react";
import { Link } from "react-router-dom";
import styles from "./LinkItem.module.css";

const LinkItem = ({ to, text, icon, isSelected }) => {
  return (
    <Link
      to={to}
      className={`${styles.LinkItem} ${
        isSelected ? styles.LinkItem__Selected : null
      }`}
    >
      <img src={icon} />
      <span>{text}</span>
    </Link>
  );
};

export default LinkItem;
