import React from "react";
import { ErrorMessage, Field } from "formik";
import styles from "./FormDesign.module.css";

import Warning_Logo from "../../assets/Warning_Logo.svg";

export const FieldWithError = ({ name, type, placeHolder, ...props }) => {
  return (
    <div className={styles.FieldWithError}>
      <ErrorMessage name={name}>
        {(message) => (
          <div className={styles.WarningMessage}>
            <img src={Warning_Logo} alt="Error" />
            <span>{message}</span>
          </div>
        )}
      </ErrorMessage>
      <Field name={name} type={type} placeholder={placeHolder} />
    </div>
  );
};

export const RowDivision = ({ children }) => {
  return <div className={styles.RowDivision}>{children}</div>;
};

export const Division = ({ gap = "15px", children }) => {
  return (
    <div
      className={styles.Division}
      style={{ gap: `${gap.replace(/[^\d.-]/g, "")}px` }}
    >
      {children}
    </div>
  );
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
