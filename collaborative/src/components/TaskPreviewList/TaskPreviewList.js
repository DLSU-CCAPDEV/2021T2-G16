import React from "react";
import { connect } from "react-redux";
import TaskPreviewItem from "./TaskPreviewItem/TaskPreviewItem";
import styles from "./TaskPreviewList.module.css";

const TaskPreviewList = ({ taskItems = [] }) => {
  const renderTaskItems = () => {
    return taskItems.map((item) => <TaskPreviewItem taskProps={item} />);
  };

  return (
    <div className={styles.TaskPreviewList}>
      <ul className={styles.List}>{renderTaskItems()}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { taskReducer, currentUserReducer } = state;

  return {
    taskItems: taskReducer.filter(
      (item) => item.uniqueID === currentUserReducer.uniqueID
    ),
  };
};

export default connect(mapStateToProps)(TaskPreviewList);
