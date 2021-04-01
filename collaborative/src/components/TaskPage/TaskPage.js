import React from "react";
import Button from "../Button/Button";
import New__White from "../../assets/New__White.svg";
import TaskPreviewList from "../TaskPreviewList/TaskPreviewList";
import styles from "./TaskPage.module.css";
import { isOverflowingVertically } from "../../logic";

const TaskPage = () => {
  return (
    <section className={`${styles.TaskPage}`}>
      <div className={`narrowPage ${styles.List}`}>
        <TaskPreviewList primary />
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
          >
            Add Task <img src={New__White} alt="New Project" />
          </Button>
        </div>
      </footer>
    </section>
  );
};

export default TaskPage;
