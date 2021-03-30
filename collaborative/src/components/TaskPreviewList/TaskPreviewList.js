import React from "react";
import { connect } from "react-redux";
import TaskPreviewItem from "./TaskPreviewItem/TaskPreviewItem";
import styles from "./TaskPreviewList.module.css";

const TaskPreviewList = ({ taskItems = [] }) => {
  const renderTaskItems = () => {
    return taskItems.map((item, index) => {
      return index < taskItems.length - 1 ? (
        <div className={styles.Item__Border}>
          <TaskPreviewItem taskProps={item} />
          <hr />
        </div>
      ) : (
        <TaskPreviewItem taskProps={item} />
      );
    });
  };

  return (
    <div className={styles.TaskPreviewList}>
      <div className={styles.Header}>
        <span className={styles.Header_Name}>Task Name</span>
        <span className={styles.Header_Priority}>Priority</span>
      </div>
      <hr />
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
