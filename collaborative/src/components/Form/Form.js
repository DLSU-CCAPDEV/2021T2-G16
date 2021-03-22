import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogin, userRegistration } from "../../actions/index";
import styles from "./Form.module.css";

const clearForm = () => {
  document.getElementById("form").reset();
};

var linkTo = "";

const Form = ({
  ErrorText,
  children,
  width,
  purpose,
  userLogin,
  userRegistration,
  userDatabase,
}) => {
  const [formData, updateFormData] = useState({});
  const [hasError, updateError] = useState(false);
  const history = useHistory();
  const handleForwardToLink = useCallback(() => history.push(`/${linkTo}`), [
    history,
  ]);

  const handleOnChange = (event) => {
    //  TODO hide password
    updateFormData({
      ...formData,
      [event.target.id]: event.target.value.trim(),
    });
  };

  const handleOnSubmit = (event, forwardToLink) => {
    // event.preventDefault();

    switch (purpose) {
      case "login":
        //  Login into account
        if (
          userDatabase.find(
            (item) => item.emailInput === formData.emailInput
          ) !== undefined
        ) {
          userLogin(formData);
        }

        //  Account credentials mismatches
        else {
        }
        break;
      case "registration":
        //  Create a new account
        if (
          userDatabase.find(
            (item) => item.emailInput === formData.emailInput
          ) === undefined
        ) {
          userRegistration(formData);
        }

        //  Account already exists
        else {
          updateError(!hasError);
        }
        break;
      default:
        console.log("ERROR in Form.js. Form has no purpose");
    }

    //  TODO account exists / wrong credentials
    forwardToLink();
  };

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
              return item;
            } else {
              let props = item.props;
              return (
                <input
                  type={props.type}
                  id={props.id}
                  name={props.name}
                  placeholder={props.placeholder}
                  required={props.required}
                  onChange={handleOnChange}
                />
              );
            }
          default:
            return item;
        }
      }
    });
  };

  const renderErrorText = () => {
    if (hasError) {
      return <span className={styles.ErrorText}>{ErrorText}</span>;
    } else {
      return <span>No Error</span>;
    }
  };

  return (
    <form
      className={styles.Form}
      id="form"
      style={{ width }}
      action="#"
      method="post"
      onSubmit={(event) => handleOnSubmit(event, handleForwardToLink)}
    >
      {renderChildren(children)}
      {renderErrorText()}
    </form>
  );
};

const mapStateToProps = (state) => {
  return { userDatabase: state.userReducer };
};

export default connect(mapStateToProps, { userLogin, userRegistration })(Form);
