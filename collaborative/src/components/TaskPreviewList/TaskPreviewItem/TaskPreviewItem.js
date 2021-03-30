import React from "react";
import CheckMark from "../../../assets/Checkmark.svg";
import PrioritySignal from "../PrioritySignal/PrioritySignal";
import styles from "./TaskPreviewItem.module.css";

const TaskPreviewItem = ({ taskProps }) => {
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
      <img src={CheckMark} alt="Check this Task" />
      <span>{taskProps.taskName}</span>
      <div className={styles.Priority}>{renderPriority()}</div>
    </li>
  );
};

export default TaskPreviewItem;
