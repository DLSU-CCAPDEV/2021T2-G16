import React from "react";
import styles from "./Form.module.css";

const renderChildren = (children) => {
  return children.map((item) => {
    if (item.props.to !== undefined) {
      return <div className={styles.Form__right_end}>{item}</div>;
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

const Form = ({ children, width }) => {
  return (
    <form className={styles.Form} style={{ width }} action="#" method="post">
      {renderChildren(children)}
    </form>
  );
};

export default Form;
