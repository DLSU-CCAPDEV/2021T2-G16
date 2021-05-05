import React, { useState } from "react";
import styles from "./TaskPreviewItem.module.css";

import CheckMark from "../../../assets/Checkmark.svg";
import CheckMark__Checked from "../../../assets/Checkmark__Checked.svg";
import EditTask from "../../../assets/EditTask.svg";
import PrioritySignal from "../PrioritySignal/PrioritySignal";

const TaskPreviewItem = ({ taskProps, handleOnDelete, handleOnClick }) => {
  const [isHoveredOn, toggleHover] = useState(false);

  const renderPriority = () => {
    if (taskProps.taskPriority === "high") {
      return <PrioritySignal high />;
    } else if (taskProps.taskPriority === "medium") {
      return <PrioritySignal medium />;
    } else if (taskProps.taskPriority === "low") {
      return <PrioritySignal low />;
    }
  };

  return (
    <li className={styles.TaskPreviewItem}>
      <img
        src={EditTask}
        alt="Edit Task"
        className={styles.TaskPreviewItem_Edit}
        onClick={() => handleOnClick()}
      />
      <img
        src={isHoveredOn ? CheckMark__Checked : CheckMark}
        onMouseEnter={() => toggleHover(true)}
        onMouseLeave={() => toggleHover(false)}
        onClick={() => handleOnDelete(taskProps)}
        alt="Check this Task"
        className={styles.TaskPreviewItem_Check}
      />
      <span>{taskProps.taskName}</span>
      <div className={styles.Priority}>{renderPriority()}</div>
    </li>
  );
};

export default TaskPreviewItem;
