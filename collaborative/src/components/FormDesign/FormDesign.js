import React from "react";
import styles from "./FormDesign.module.css";

export const RowDivision = ({ children }) => {
  return <div className={styles.RowDivision}>{children}</div>;
};

export const Division = ({ children }) => {
  return <div className={styles.Division}>{children}</div>;
};

export const FormDesign = ({ width = "500px", primary, children }) => {
  return (
    <div
      className={`${styles.FormDesign} ${
        primary ? styles.FormDesign__Primary : null
      }`}
      style={{ width: `${width.replace(/[^\d.-]/g, "")}px` }}
    >
      {children}
    </div>
  );
};
