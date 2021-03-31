import React from "react";
import TaskPreviewList from "../TaskPreviewList/TaskPreviewList";
import styles from "./TaskPage.module.css";

const TaskPage = () => {
  return (
    <section className={`narrowPage ${styles.TaskPage}`}>
      <div className={styles.List}>
        <div className={styles.ListHeader}>
          <div className={styles.ListHeader_Divider}></div>
          <TaskPreviewList primary />
        </div>
      </div>
      <div className={styles.AddTask}>
        <span>Add Task</span>
      </div>
    </section>
  );
};

export default TaskPage;
