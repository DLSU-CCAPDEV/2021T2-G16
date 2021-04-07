import React, { useCallback } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import styles from "./LoginPage.module.css";

import { Division, FormDesign, FieldWithError } from "../FormDesign/FormDesign";
import Logo from "../Logo/Logo";
import CloseButton from "../../assets/CloseButton.svg";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required."),
  password: Yup.string().required("Password is required."),
});

const LoginPage = () => {
  const history = useHistory();
  const redirectUser = useCallback(() => history.push("/homepage"), [history]);

  return (
    <section className={styles.LoginPage}>
      <Logo />
      <FormDesign primary width="400px">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(formData) => {
            const data = JSON.stringify(formData, null, 2);
            redirectUser();
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
            <Field type="submit" value="Log In" />
            <hr />
            <Link to="/registration" style={{ alignSelf: "center" }}>
              Don’t have an account yet? Register here
            </Link>
          </Form>
        </Formik>
      </FormDesign>
    </section>
  );
};

export default LoginPage;
