import React, { useCallback } from "react";
import { connect } from "react-redux";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import styles from "./RegistrationPage.module.css";

import CloseButton from "../../assets/CloseButton.svg";
import Logo from "../Logo/Logo";
import {
  Division,
  FieldWithError,
  FormDesign,
  RowDivision,
  WarningMessage,
} from "../FormDesign/FormDesign";

const registrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required.")
    .min(2, "Entry is too short - at least 2 characters."),
  lastName: Yup.string()
    .required("Last Name is required.")
    .min(2, "Entry is too short - at least 2 characters."),
  email: Yup.string().email("Invalid Email").required("Email is required."),
  password: Yup.string()
    .min(5, "Passwords must be at least be 5 characters")
    .required("Password is required."),
});

const RegistrationPage = ({ currentUser }) => {
  const history = useHistory();
  const handleNoCurrentUser = useCallback(() => history.push("/homepage"), [
    history,
  ]);

  if (currentUser) {
    handleNoCurrentUser();
    return null;
  } else {
    return (
      <section className={styles.RegistrationPage}>
        <Logo />
        <FormDesign primary width="500px">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={registrationSchema}
            onSubmit={(formData) => {
              const data = JSON.stringify(formData, null, 2);
              alert(data);
            }}
          >
            <Form>
              <Link to="/" style={{ alignSelf: "flex-end" }}>
                <img src={CloseButton} alt="Close Button" />
              </Link>
              <Division>
                <h1>Registration</h1>
                <p>
                  Prepared to start an impact? Please fill-in this form to
                  create a Collaborative account.
                </p>
              </Division>
              <hr />
              <Division gap="5px">
                <RowDivision>
                  <FieldWithError
                    name="firstName"
                    type="text"
                    placeHolder="First Name"
                  />
                  <FieldWithError
                    name="lastName"
                    type="text"
                    placeHolder="Last Name"
                  />
                </RowDivision>
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
                hereby read and agree to the Terms of Service and Privacy
                Policy.
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
  }
};

const mapStateToProps = (state) => {
  return { currentUser: state.currentUserReducer };
};

export default connect(mapStateToProps)(RegistrationPage);
