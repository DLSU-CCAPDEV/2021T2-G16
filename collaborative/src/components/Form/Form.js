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

  const handleOnSubmit = (event, forwardToLink) => {
    event.preventDefault();
    let userAccount;

    switch (formPurpose) {
      case "login":
        /**
         *  If the credentials matches an existing account,
         *  then allow the User to log-in.
         */
        if (
          (userAccount = userDatabase.find(
            (item) =>
              item.email.toLowerCase() === formData.emailInput.toLowerCase() &&
              item.password === formData.passwordInput
          )) !== undefined
        ) {
          userLogin(userAccount);
          forwardToLink();
        } else {
          /**
           *  Otherwise, prevent User log-in and display ERROR
           *  text
           */
          updateError(true);
        }
        break;

      case "registration":
        /**
         *  If the account does not yet exists, then
         *  register the User into their new account
         */
        if (
          userDatabase.find(
            (item) =>
              item.email.toLowerCase() === formData.emailInput.toLowerCase()
          ) === undefined
        ) {
          userRegistration(formData);
          forwardToLink();
        } else {
          /**
           *  Otherwise, prevent User from registering and
           *  display ERROR text
           */
          updateError(true);
        }
        break;

      case "addTask":
        break;

      default:
        console.log("WARNING. Form has no purpose");
    }
  };

  //  Get the data inside the Input(s)
  const handleOnChange = (event) => {
    updateFormData({
      ...formData,
      [event.target.id]: event.target.value.trim(),
    });
  };

  const renderStyle = ({ clickable, flex__end, flex__center }) => {
    let style = {};

    style.cursor = clickable ? "pointer" : null;

    if (flex__center) {
      style.margin = flex__center ? "0 auto" : null;
    } else if (flex__end) {
      style.margin = flex__end ? "0 0 0 auto" : null;
    }

    return style;
  };

  //  TODO determine whether or not this needs refactoring, styles are getting too cluttered
  const renderChildren = (children, initialValue) => {
    return React.Children.map(children, (item) => {
      //  Get into Root components
      if (item.type === "div") {
        let { props } = item;

        return (
          <div className={`${props.Column ? styles.Column : styles.Row}`}>
            {renderChildren(item.props.children, initialValue)}
          </div>
        );
      }

      //  Overseer the data inside Input components
      else if (item.type === "input") {
        console.log(item);
        let { props } = item;
        return (
          <input
            type={props.type}
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            required={props.required}
            onChange={(event) => handleOnChange(event)}
            value={props.value}
            key={++initialValue}
            className={`${styles.Input} ${
              props.editableText
                ? styles.Input__EditableText
                : styles.Input__BoxyText
            }`}
          />
        );
      }

      //  Otherwise, put into Wrapper and render as it is
      else {
        let { props } = item;
        return (
          <div
            key={++initialValue}
            style={renderStyle(props)}
            onClick={props.handleOnClick ? () => props.handleOnClick() : null}
            placeholder={props.placeholder ? props.placeholder : null}
          >
            {item}
          </div>
        );
      }
    });
  };

  //  Insert the ERROR text
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
