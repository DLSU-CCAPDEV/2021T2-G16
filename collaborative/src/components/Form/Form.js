import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
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

const Form = ({ children, width }) => {
  const history = useHistory();
  const handleSubmit = useCallback(() => history.push("/wadwadawd"), [history]);

  return (
    <form
      className={styles.Form}
      style={{ width }}
      action="#"
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      {renderChildren(children)}
    </form>
  );
};

export default Form;
