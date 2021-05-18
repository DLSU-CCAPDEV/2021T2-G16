import Loader from "react-loader-spinner";
import React, { useEffect, useRef, useState } from "react";
import styles from "./TaskPreviewList.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import agent from "../../actions/agent";
import Confetti from "../../assets/Confetti.svg";
import TaskPreviewItem from "./TaskPreviewItem/TaskPreviewItem";

const mapStateToProps = (state) => {
  return { taskItems: state.taskReducer };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: () => agent.TaskAPI.get(dispatch),
});

const TaskPreviewList = ({ taskItems, onLoad, handleOnEdit, primary }) => {
  useEffect(() => {
    onLoad();
  }, []);

  const renderTaskItems = () => {
    const tasksTreshold = 5;

    return [
      ...taskItems.tasks.map((taskItem, index) => {
        if (index + 1 < tasksTreshold || primary) {
          return (
            <div>
              <div className={styles.Item__Border}>
                <TaskPreviewItem
                  taskProps={taskItem}
                  handleOnEdit={handleOnEdit}
                  primary={primary}
                />
              </div>
              {primary && index + 1 === taskItems.length ? null : <hr />}
            </div>
          );
        } else {
          return null;
        }
      }),
      taskItems.length >= 5 && !primary ? (
        <Link to="/tasks" className={styles.Item_More}>
          See More...
        </Link>
      ) : null,
    ];
  };

  return (
    <div
      className={`${styles.TaskPreviewList} ${
        primary
          ? styles.TaskPreviewList__Primary
          : styles.TaskPreviewList__Secondary
      }`}
    >
      <div className={styles.Header}>
        <span className={styles.Header_name}>Task Name</span>
        <span
          className={`${styles.Header_Priority} ${
            primary
              ? styles.Header_Priority__Primary
              : styles.Header_Priority__Secondary
          }`}
        >
          Priority
        </span>
      </div>
      <hr />
      {taskItems.loading ? (
        <div className={`${styles.Message} ${styles.TaskPreviewList_Display}`}>
          <Loader type="Grid" color="gainsboro" height={100} width={100} />
        </div>
      ) : taskItems.tasks.length >= 1 ? (
        <ul
          className={`${styles.List} ${
            primary ? styles.List__Primary : styles.List__Secondary
          }`}
        >
          {renderTaskItems()}
        </ul>
      ) : (
        <div className={`${styles.Message} ${styles.TaskPreviewList_Display}`}>
          <img src={Confetti} alt="Confetti!" />
          <span>Congratulations! You currently have no impending tasks.</span>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPreviewList);
