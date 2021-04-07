import React from "react";
import { ErrorMessage, Field } from "formik";
import styles from "./FormDesign.module.css";

import Warning_Logo from "../../assets/Warning_Logo.svg";

export const FieldWithError = ({
  name,
  type,
  placeHolder,
  reverse,
  ...props
}) => {
  return (
    <div
      className={`${styles.FieldWithError} ${
        reverse
          ? styles.FieldWithError__BottomUp
          : styles.FieldWithError__TopDown
      }`}
    >
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

export const RowDivision = ({ gap = "15px", children }) => {
  return (
    <div
      className={styles.RowDivision}
      style={{ gap: `${gap.replace(/[^\d.-]/g, "")}px` }}
    >
      {children}
    </div>
  );
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

export const FormDesign = ({ width, primary, children }) => {
  return (
    <div
      className={`${styles.FormDesign} ${
        primary ? styles.FormDesign__Primary : styles.FormDesign__Secondary
      }`}
      style={{ width: width ? `${width.replace(/[^\d.-]/g, "")}px` : "100%" }}
    >
      {children}
    </div>
  );
};
