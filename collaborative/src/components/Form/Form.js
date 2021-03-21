import React from "react";
import styles from "./Form.module.css";

const renderChildren = (children) => {
  return children.map((item) => {
    if (item.props.to !== undefined) {
      return (
        <div
          className={
            item.props.flex_end
              ? styles.flex_end
              : null || item.props.flex_center
              ? styles.flex_center
              : null
          }
        >
          {item}
        </div>
      );
    } else {
      switch (item.type) {
        //    Get to root elements
        case "div":
          return (
            <div className={item.props.column ? styles.column : styles.row}>
              {renderChildren(item.props.children)}
            </div>
          );
        default:
          return item;
      }
    }
  });
};

const handleSubmit = (event) => {
  alert("handled");
  event.preventDefault();
};

const Form = ({ children, width }) => {
  return (
    <form
      className={styles.Form}
      style={{ width }}
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      {renderChildren(children)}
    </form>
  );
};

export default Form;
