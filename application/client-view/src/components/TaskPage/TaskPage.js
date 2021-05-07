import * as Yup from "yup";
import axios from "axios";
import Popup from "reactjs-popup";
import React, { useState } from "react";
import styles from "./TaskPage.module.css";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";

import {
  Division,
  FormDesign,
  FieldWithError,
  RowDivision,
} from "../FormDesign/FormDesign";
import Button from "../Button/Button";
import CloseButton from "../../assets/CloseButton.svg";
import New__White from "../../assets/New__White.svg";
import TaskPreviewList from "../TaskPreviewList/TaskPreviewList";

const taskSchema = Yup.object().shape({
  taskName: Yup.string()
    .required("Task must have a name")
    .min(5, "Task name is too short - at least 5 characters.")
    .max(50, "Task name is too long - at most 50 characters."),
  taskDescription: Yup.string(),
  taskPriority: Yup.string(),
});

// TODO Fix misalignment styling whenever there there is no more scroll
const TaskPage = () => {
  const [isAddTaskModalEnabled, setAddTaskModalStatus] = useState(false);
  const [isEditTaskModalEnabled, setEditTaskModalStatus] = useState(false);
  const [taskToBeEdited, setTaskToBeEdited] = useState(null);

  const renderAddTaskModal = () => {
    return (
      <Popup
        open={isAddTaskModalEnabled}
        modal
        closeOnEscape={false}
        overlayStyle={{ backgroundColor: "rgba(29, 24, 37, 0.836)" }}
        position="center center"
        onClose={() => setAddTaskModalStatus(false)}
      >
        <FormDesign width="500px" className={styles.TaskPage_Form}>
          <Formik
            initialValues={{
              taskName: "",
              taskDescription: "",
              taskPriority: "low",
            }}
            validationSchema={taskSchema}
            onSubmit={async (formData) => {
              const queryString = new URLSearchParams(formData).toString();

              await axios
                .post("/api/tasks/create", queryString, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                })
                .then((response) => {})
                .catch((error) => console.log(error));

              setAddTaskModalStatus(false);
            }}
          >
            <Form>
              <Division>
                <img
                  src={CloseButton}
                  alt="Close Button"
                  onClick={() => setAddTaskModalStatus(false)}
                  style={{
                    alignSelf: "flex-end",
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                  }}
                />
                <Division gap="20px">
                  <h1>Create a New Task</h1>
                  <FieldWithError
                    name="taskName"
                    type="text"
                    placeHolder="Task Name"
                  />
                  <Division gap="10px">
                    <label>Task Description</label>
                    <Field
                      name="taskDescription"
                      as="textarea"
                      placeHolder="Your Task Description"
                    />
                  </Division>
                  <RowDivision>
                    <label for="taskPriority">Priority</label>
                    <Field name="taskPriority" as="select">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </Field>
                  </RowDivision>
                  <Field type="submit" value="Create New Task" />
                </Division>
              </Division>
            </Form>
          </Formik>
        </FormDesign>
      </Popup>
    );
  };

  const renderEditTaskModal = () => {
    return (
      <Popup
        open={isEditTaskModalEnabled}
        modal
        closeOnEscape={false}
        overlayStyle={{ backgroundColor: "rgba(29, 24, 37, 0.836)" }}
        position="center center"
        onClose={() => setEditTaskModalStatus(false)}
      >
        <FormDesign width="500px" className={styles.TaskPage_Form}>
          <Formik
            initialValues={{
              taskName: taskToBeEdited ? taskToBeEdited.taskName : "",
              taskDescription: taskToBeEdited
                ? taskToBeEdited.taskDescription
                : "",
              taskPriority: taskToBeEdited ? taskToBeEdited.taskPriority : "",
            }}
            validationSchema={taskSchema}
            onSubmit={async (formData) => {
              formData.oldTaskName = taskToBeEdited.taskName;

              const queryString = new URLSearchParams(formData).toString();

              await axios.post("/api/tasks/update", queryString, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              });
              setEditTaskModalStatus(false);
            }}
          >
            <Form>
              <Division>
                <img
                  src={CloseButton}
                  alt="Close Button"
                  onClick={() => setEditTaskModalStatus(false)}
                  style={{
                    alignSelf: "flex-end",
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                  }}
                />
                <Division gap="20px">
                  <h1>Edit Task</h1>
                  <FieldWithError
                    name="taskName"
                    type="text"
                    placeHolder="Task Name"
                  />
                  <Division gap="10px">
                    <label>Task Description</label>
                    <Field
                      name="taskDescription"
                      as="textarea"
                      placeHolder="Your Task Description"
                    />
                  </Division>
                  <RowDivision>
                    <label for="priorities">Priority</label>
                    <Field name="priorities" as="select">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </Field>
                  </RowDivision>
                  <Field type="submit" value="Save Edited Task" />
                </Division>
              </Division>
            </Form>
          </Formik>
        </FormDesign>
      </Popup>
    );
  };

  return (
    <section className={`${styles.TaskPage}`}>
      {renderAddTaskModal()}
      {renderEditTaskModal()}
      <div className={`narrowPage ${styles.List}`}>
        <TaskPreviewList
          primary
          handleOnEdit={(taskItem) => {
            setTaskToBeEdited(taskItem);
            setEditTaskModalStatus(true);
          }}
        />
      </div>
      <footer className={styles.TaskPage_Footer}>
        <div className={`${styles.Footer_Content}`}>
          <div className={styles.Column_1} />
          <Button
            backgroundColor="#3ea8ff"
            color="white"
            primary
            bold
            fontSize="16"
            smooth
            onClick={() => setAddTaskModalStatus(true)}
          >
            Add Task <img src={New__White} alt="New Project" />
          </Button>
        </div>
      </footer>
    </section>
  );
};

export default TaskPage;
