import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Form.module.css";

var linkTo = "";
var initialFormData = {};

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
          onClick={clearForm}
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
        case "input":
          if (item.props.type === "submit") {
            linkTo = item.props.linkTo;
          } else {
            initialFormData[item.props.id] = null;
          }
          return item;
        default:
          return item;
      }
    }
  });
};

const clearForm = () => {
  document.getElementById("form").reset();
};

const Form = ({ children, width }) => {
  const [formData, updateFormData] = useState(initialFormData);
  const history = useHistory();
  const forwardToLink = useCallback(() => history.push(`/${linkTo}`), [
    history,
  ]);

  const handleOnSubmit = (event, forwardToLink) => {
    event.preventDefault();
    // console.log(event);
    // console.log(event.target[0].value);
    //  TODO account exists / wrong credentials
    forwardToLink();
  };

  return (
    <form
      className={styles.Form}
      id="form"
      style={{ width }}
      action="#"
      method="post"
      onSubmit={(event) => handleOnSubmit(event, forwardToLink)}
    >
      {renderChildren(children)}
    </form>
  );
};

export default Form;
