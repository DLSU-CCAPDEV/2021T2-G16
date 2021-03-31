import React, { useState } from "react";
import CheckMark from "../../../assets/Checkmark.svg";
import CheckMark__Checked from "../../../assets/Checkmark__Checked.svg";
import PrioritySignal from "../PrioritySignal/PrioritySignal";
import styles from "./TaskPreviewItem.module.css";

const TaskPreviewItem = ({ taskProps }) => {
  const [isHoveredOn, toggleHover] = useState(false);

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
      <img
        src={isHoveredOn ? CheckMark__Checked : CheckMark}
        onMouseEnter={() => toggleHover(true)}
        onMouseLeave={() => toggleHover(false)}
        alt="Check this Task"
      />
      <span>{taskProps.taskName}</span>
      <div className={styles.Priority}>{renderPriority()}</div>
    </li>
  );
};

export default TaskPreviewItem;
