import React, { useCallback } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import styles from "./RegistrationPage.module.css";

import { Division, FieldWithError, FormDesign } from "../FormDesign/FormDesign";
import CloseButton from "../../assets/CloseButton.svg";
import Logo from "../Logo/Logo";

const registrationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required.")
    .matches(
      /^[A-Za-z0-9 ]*$/,
      "Usernames must only be Latin Characters and Digits."
    )
    .min(5, "Username is too short - at least 5 characters."),
  email: Yup.string().email("Invalid Email").required("Email is required."),
  password: Yup.string()
    .min(5, "Passwords must be at least be 5 characters")
    .required("Password is required."),
});

const RegistrationPage = () => {
  //  TODO do authentication redirection
  const history = useHistory();
  const redirectUser = useCallback(() => history.push("/homepage"), [history]);

  return (
    <section className={styles.RegistrationPage}>
      <Logo />
      <FormDesign
        primary
        width="450px"
        className={styles.RegistrationPage_Form}
      >
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={registrationSchema}
          onSubmit={(formData) => {
            const data = JSON.stringify(formData, null, 2);
            //  TODO Refactor all client-side redirection to server-side
            redirectUser();
          }}
        >
          <Form>
            <Link to="/" style={{ alignSelf: "flex-end" }}>
              <img src={CloseButton} alt="Close Button" />
            </Link>
            <Division>
              <h1>Registration</h1>
              <p>
                Prepared to start an impact? Please fill-in this form to create
                a Collaborative account.
              </p>
              <hr />
            </Division>
            <Division gap="5px">
              <FieldWithError
                name="username"
                type="text"
                placeHolder="Username"
              />
              <FieldWithError
                name="email"
                type="email"
                placeHolder="Email Address"
              />
              <FieldWithError
                name="password"
                type="password"
                placeHolder="Your Super Secure Password"
              />
            </Division>
            <p>
              By registering a Collaborative account, you confirm that you
              hereby read and agree to the Terms of Service and Privacy Policy.
            </p>
            <Field type="submit" value="Register Your Account" />
            <hr />
            <Link to="/login" style={{ textAlign: "center" }}>
              Already have an account? Log In
            </Link>
          </Form>
        </Formik>
      </FormDesign>
    </section>
  );
};

export default RegistrationPage;
