import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Confetti from "../../assets/Confetti.svg";
import { taskDelete } from "../../actions";
import TaskPreviewItem from "./TaskPreviewItem/TaskPreviewItem";
import styles from "./TaskPreviewList.module.css";

const TaskPreviewList = ({ taskItems = [], taskDelete }) => {
  const handleOnDelete = (taskProps) => {
    taskDelete(taskProps);
  };

  const renderTaskItems = () => {
    return taskItems.map((item, index) => {
      return index + 1 < 5 ? (
        <div className={styles.Item__Border}>
          <TaskPreviewItem taskProps={item} handleOnDelete={handleOnDelete} />
          <hr />
        </div>
      ) : (
        <Link to="/tasks" className={styles.Item_More}>
          See More...
        </Link>
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
      {taskItems.length >= 1 ? (
        <ul className={styles.List}>{renderTaskItems()}</ul>
      ) : (
        <div className={styles.Message}>
          <img src={Confetti} alt="Confetti!" />
          <span>Congratulations! You currently have no impending tasks.</span>
        </div>
      )}
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

export default connect(mapStateToProps, { taskDelete })(TaskPreviewList);
