import * as Yup from "yup";
import axios from "axios";
import React, { useCallback } from "react";
import styles from "./ProjectNew.module.css";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Link, useHistory } from "react-router-dom";

import agent from "../../actions/agent";
import GoBack from "../../assets/GoBack.svg";
import {
  Division,
  FormDesign,
  FieldWithError,
  RowDivision,
} from "../FormDesign/FormDesign";

const projectSchema = Yup.object().shape({
  projectName: Yup.string()
    .required("Project must have a name")
    .min(5, "Project name is too short - at least 5 characters.")
    .max(40, "Project name is too long - at most 40 characters."),
  projectDescription: Yup.string(),
  projectPriority: Yup.number(),
});

const mapDispatchToProps = (dispatch) => ({
  onCreate: (projectData) => agent.ProjectAPI.create(dispatch, projectData),
});

const ProjectNew = ({ onCreate }) => {
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push("/projects"), [history]);

  return (
    <section className={styles.ProjectNew}>
      <div className={styles.ProjectNew_Left}>
        <Link to="/projects" className={styles.Left_GoBack}>
          <img
            src={GoBack}
            alt="Go Back"
            style={{ width: "25px", height: "25px" }}
          />
          <span>Go Back</span>
        </Link>
        <FormDesign>
          <Formik
            initialValues={{
              projectName: "",
              projectDescription: "",
              projectBackgroundImage: 1,
            }}
            validationSchema={projectSchema}
            onSubmit={async (formData) => {
              onCreate(formData);
              handleOnClick();
            }}
          >
            <Form>
              <Division gap="20px">
                <h1>Create a New Project</h1>
                <FieldWithError
                  name="projectName"
                  type="text"
                  placeHolder="Project Name"
                />
                <Division gap="10px">
                  <label>Project Description</label>
                  <Field
                    name="projectDescription"
                    as="textarea"
                    placeHolder="Your Project Description"
                  />
                </Division>
                <RowDivision>
                  <label>Background Image</label>
                  <Field name="projectBackgroundImage" as="select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Field>
                </RowDivision>
                <Field type="submit" value="Create Project" />
              </Division>
            </Form>
          </Formik>
        </FormDesign>
      </div>
      <div className={styles.ProjectNew_Right}></div>
    </section>
  );
};

export default connect(() => {}, mapDispatchToProps)(ProjectNew);
