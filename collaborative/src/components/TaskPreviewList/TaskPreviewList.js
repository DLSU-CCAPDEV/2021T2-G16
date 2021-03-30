import React from "react";
import styles from "./TaskPreviewList.module.css";

const TaskPreviewList = ({ children }) => {
  const renderElements = (children) => {
    return children.map((item) => <h1>Item</h1>);
  };

  return (
    <div className={styles.TaskPreviewList}>
      <ul>{renderElements(children)}</ul>
    </div>
  );
};

export default TaskPreviewList;
