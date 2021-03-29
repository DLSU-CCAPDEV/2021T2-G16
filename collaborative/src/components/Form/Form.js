import React, { useCallback, useEffect, useState } from "react";
import $ from "jquery";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userLogin, userRegistration } from "../../actions/index";
import Warning_Logo from "../../assets/Warning_Logo.svg";
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

  const renderChildren = (children, initialValue) => {
    return React.Children.map(children, (item) => {
      //  Render root components
      if (item.type === "div") {
        return renderChildren(item.props.children, initialValue);
      } else if (item.type === Link) {
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
        return item;
      }
    });
  };

  useEffect(() => {
    if (hasError && $(`.${styles.ErrorText}`).get().length === 0) {
      $(
        `<div class=${styles.ErrorText}>
          <img src=${Warning_Logo} />
          <span>${errorText}</span>
         </div>`
      ).insertBefore(
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
      {renderChildren(children, 1)}
    </form>
  );
};

const mapStateToProps = (state) => {
  return { userDatabase: state.userReducer };
};

export default connect(mapStateToProps, { userLogin, userRegistration })(Form);
