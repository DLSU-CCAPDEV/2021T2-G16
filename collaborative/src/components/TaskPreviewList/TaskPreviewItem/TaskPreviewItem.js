import React from "react";
import PrioritySignal from "../PrioritySignal/PrioritySignal";
import styles from "./TaskPreviewItem.module.css";

const TaskPreviewItem = ({ taskProps }) => {
  console.table(taskProps);

  const renderPriority = () => {
    if (taskProps.priority === "high") {
      return <PrioritySignal high />;
    } else if (taskProps.priority === "medium") {
      return <PrioritySignal medium />;
    } else if (taskProps.priority === "low") {
      return <PrioritySignal low />;
    }
  };

  return (
    <li className={styles.TaskPreviewItem}>
      <span>{taskProps.taskName}</span>
      <div className={styles.Priority}>{renderPriority()}</div>
    </li>
  );
};

export default TaskPreviewItem;
