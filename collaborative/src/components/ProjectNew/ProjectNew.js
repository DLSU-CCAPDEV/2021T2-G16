import React, { useCallback } from "react";
import Form from "../Form/Form";
import { useHistory } from "react-router";
import GoBack from "../../assets/GoBack.svg";
import styles from "./ProjectNew.module.css";

const ProjectNew = () => {
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push("/projects"), [history]);

  return (
    <section className={styles.ProjectNew}>
      <div className={styles.ProjectNew_Left}>
        <Form formPurpose="addProject" linkTo="/projects">
          <div handleOnClick={() => handleOnClick()} clickable>
            <img
              src={GoBack}
              alt="Go Back"
              style={{ width: "25px", height: "25px" }}
            />
            <h1 style={{ fontSize: "20px" }}>Go Back</h1>
          </div>
          <label for="taskNameInput">
            <h1 style={{ textTransform: "capitalize" }}>
              Create a New Project
            </h1>
          </label>
          <div Column>
            <input
              type="text"
              name="task-name-input"
              id="taskNameInput"
              placeholder="Project Name"
              required
              editableText
            />
            <div Column>
              <label for="descriptionInput">Project Description</label>
              <textarea
                id="descriptionInput"
                placeholder="Project description."
              />
            </div>
          </div>
          <input type="submit" value="Create Project" />
        </Form>
      </div>
      <div className={styles.ProjectNew_Right}>Right</div>
    </section>
  );
};

export default ProjectNew;
