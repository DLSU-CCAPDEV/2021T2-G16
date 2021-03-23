import React, { useCallback, useEffect, useState } from "react";
import $ from "jquery";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogin, userRegistration } from "../../actions/index";
import styles from "./Form.module.css";

const Form = ({
  errorText,
  children,
  width,
  formPurpose,
  userLogin,
  userRegistration,
  userDatabase,
  linkTo,
}) => {
  const [formData, updateFormData] = useState({});
  const [hasError, updateError] = useState(false);
  const history = useHistory();
  const handleForwardToLink = useCallback(
    () => history.push(linkTo !== undefined ? `${linkTo}` : "/"),
    [history]
  );

  const handleOnChange = (event) => {
    //  TODO hide password
    updateFormData({
      ...formData,
      [event.target.id]: event.target.value.trim(),
    });
  };

  const handleOnSubmit = (event, forwardToLink) => {
    event.preventDefault();
    let userAccount;

    switch (formPurpose) {
      case "login":
        //  Login into account
        if (
          (userAccount = userDatabase.find(
            (item) =>
              item.emailInput === formData.emailInput &&
              item.passwordInput === formData.passwordInput
          )) !== undefined
        ) {
          userLogin(userAccount);
          forwardToLink();
        }

        //  Account credentials mismatches
        else {
          updateError(true);
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
          forwardToLink();
        }

        //  Account already exists
        else {
          updateError(true);
        }
        break;
      default:
        console.log("ERROR in Form.js. Form has no purpose");
    }
  };

  //  TODO: Refactor this in jQuery
  const renderChildren = (children) => {
    let keyIndex = 1; //  Surppress unique key prop requirement

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
              <div
                className={item.props.column ? styles.column : styles.row}
                key={keyIndex++}
              >
                {renderChildren(item.props.children)}
              </div>
            );
          case "input":
            let props = item.props;
            return (
              <input
                type={props.type}
                id={props.id}
                name={props.name}
                placeholder={props.placeholder}
                required={props.required}
                onChange={(event) => handleOnChange(event)}
              />
            );
          default:
            return item;
        }
      }
    });
  };

  useEffect(() => {
    if (hasError && $(`.${styles.ErrorText}`).get().length === 0) {
      $(`<span class=${styles.ErrorText}>${errorText}</span>`).insertBefore(
        $("input")
          .get()
          .find((item) => item.type === "submit")
      );
      updateError(false);
    }
  }, [hasError]);

  return (
    <form
      className={styles.Form}
      id="form"
      style={{ width }}
      action="#"
      method="post"
      onSubmit={(event) => handleOnSubmit(event, handleForwardToLink)}
    >
      {renderChildren(children, formData, updateFormData)}
    </form>
  );
};

const mapStateToProps = (state) => {
  return { userDatabase: state.userReducer };
};

export default connect(mapStateToProps, { userLogin, userRegistration })(Form);
