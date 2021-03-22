import React from "react";
import styles from "./TaskList.module.css";

const TaskList = ({ children }) => {
  const renderElements = (children) => {
    return children.map((item) => <h1>Item</h1>);
  };

  return (
    <div className={styles.TaskList}>
      <ul>{renderElements(children)}</ul>
    </div>
  );
};

export default TaskList;
