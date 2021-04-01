import React, { useState } from "react";
import Form from "../Form/Form";
import Popup from "reactjs-popup";
import Button from "../Button/Button";
import CloseButton from "../../assets/CloseButton.svg";
import New__White from "../../assets/New__White.svg";
import TaskPreviewList from "../TaskPreviewList/TaskPreviewList";
import styles from "./TaskPage.module.css";
import { isOverflowingVertically } from "../../logic";
import { Link } from "react-router-dom";

// TODO Fix misalignment styling whenever there there is no more scroll
const TaskPage = () => {
  const [isAddTaskModalEnabled, setAddTaskModalStatus] = useState(false);
  const [isEditTaskModalEnabled, setEditTaskModalStatus] = useState(false);

  const handleOnEdit = () => {};

  const handleOnCreate = () => {
    alert("Created");
  };

  const handleOnClose = () => {};

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
        <Form
          width="600px"
          formPurpose="registration"
          errorText="This email is already used."
          linkTo="/login"
        >
          <img
            src={CloseButton}
            alt="Close Button"
            handleOnClick={() => setAddTaskModalStatus(false)}
            clickable
            flex__end
          />
          <h1>Create a New Task</h1>
          <input
            type="text"
            name="task-name-input"
            id="taskNameInput"
            placeholder="Task Name"
            required
            editableText
          />
          <span>Task Description</span>
          <textarea
            name="descriptionInput"
            placeholder="My utmost important task description."
          />
          <div column>
            <input type="submit" value="Create Task" />
          </div>
        </Form>
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
        <Form
          width="600px"
          formPurpose="registration"
          errorText="This email is already used."
          linkTo="/login"
        >
          <img
            src={CloseButton}
            alt="Close Button"
            handleOnClick={() => setEditTaskModalStatus(false)}
            clickable
            flex__end
          />
          <h1>Edit Task</h1>
          <input
            type="text"
            name="task-name-input"
            id="taskNameInput"
            placeholder="Task Name"
            required
            editableText
          />
          <span>Task Description</span>
          <textarea
            name="descriptionInput"
            placeholder="My utmost important task description."
          />
          <div column>
            <input type="submit" value="Create Task" />
          </div>
        </Form>
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
          handleOnClick={() => {
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
