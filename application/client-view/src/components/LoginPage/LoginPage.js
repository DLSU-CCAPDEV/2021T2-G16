import * as Yup from "yup";
import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Link, Redirect } from "react-router-dom";

import agent from "../../actions/agent";
import Logo from "../Logo/Logo";
import CloseButton from "../../assets/CloseButton.svg";
import {
  Division,
  FormDesign,
  FieldWithError,
  WarningMessage,
} from "../FormDesign/FormDesign";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim("")
    .email("Invalid Email")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
});

const mapStateToProps = (state) => {
  return { currentUser: state.userReducer };
};

const mapDispatchToProps = (dispatch) => ({
  onLogin: (formData) => agent.UserAPI.login(dispatch, formData),
});

const LoginPage = ({ currentUser, onLogin }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  return currentUser.username === null ? (
    <section className={styles.LoginPage}>
      <Logo />
      <FormDesign primary width="400px" className={styles.LoginPage_Form}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(formData) => {
            onLogin(formData).then((responseStatus) => {
              switch (responseStatus) {
                case 200:
                  <Redirect to={"/homepage"} />;
                  break;
                case 401:
                  setErrorMessage("Mismatching Credentials. Please try again.");
                  break;
                case 500:
                  setErrorMessage("Website's server is not running.");
                  break;
                default:
                  setErrorMessage("Uncaught Error.");
              }
            });
          }}
        >
          <Form>
            <Link to="/" style={{ alignSelf: "flex-end" }}>
              <img src={CloseButton} alt="Close Button" />
            </Link>
            <Division>
              <h1>Log In</h1>
              <p>
                Welcome back! It is nice to see you again. Please fill-in the
                credentials of your Collaborative account.
              </p>
              <hr />
            </Division>
            <Division gap="5px">
              <FieldWithError
                name="email"
                type="email"
                placeHolder="Email Address"
              />
              <FieldWithError
                name="password"
                type="password"
                placeHolder="Password"
              />
            </Division>
            {errorMessage === null ? null : (
              <WarningMessage message={errorMessage} />
            )}
            <Field type="submit" value="Log In" />
            <hr />
            <Link to="/registration" style={{ alignSelf: "center" }}>
              Don’t have an account yet? Register here
            </Link>
          </Form>
        </Formik>
      </FormDesign>
    </section>
  ) : (
    <Redirect to="/homepage" />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
