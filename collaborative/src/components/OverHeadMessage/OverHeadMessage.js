import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./OverHeadMessage.module.css";

const OverHeadMessage = ({ width, children }) => {
  return (
    <div className={styles.OverHeadMessage} style={{ width: width + "px" }}>
      {children}
    </div>
  );
};

export default OverHeadMessage;
