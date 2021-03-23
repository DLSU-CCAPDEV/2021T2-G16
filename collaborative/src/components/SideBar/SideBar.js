import React, { useEffect, useState } from "react";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const [isShowing, toggleShow] = useState(false);

  return isShowing ? <aside className={styles.SideBar}>Sample</aside> : null;
};

export default SideBar;
