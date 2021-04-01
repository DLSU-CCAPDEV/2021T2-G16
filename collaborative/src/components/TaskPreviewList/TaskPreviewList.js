import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Confetti from "../../assets/Confetti.svg";
import { taskDelete } from "../../actions";
import TaskPreviewItem from "./TaskPreviewItem/TaskPreviewItem";
import styles from "./TaskPreviewList.module.css";

const TaskPreviewList = ({ taskItems = [], taskDelete, primary }) => {
  const handleOnDelete = (taskProps) => {
    taskDelete(taskProps);
  };

  const renderTaskItems = () => {
    const tasksTreshold = 5;

    return [
      ...taskItems.map((item, index) => {
        if (index + 1 < tasksTreshold || primary) {
          return (
            <div>
              <div className={styles.Item__Border}>
                <TaskPreviewItem
                  taskProps={item}
                  handleOnDelete={handleOnDelete}
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
          ? styles.TaskPreviewList_Primary
          : styles.TaskPreviewList_Secondary
      }`}
    >
      <div className={styles.Header}>
        <span
          className={
            primary
              ? styles.Header_name__Primary
              : styles.Header_Name__Secondary
          }
        >
          Task Name
        </span>
        <span
          className={`${styles.Header_Priority} ${
            primary ? styles.Header_Priority__Primary : null
          }`}
        >
          Priority
        </span>
      </div>
      <hr />
      {taskItems.length >= 1 ? (
        <ul
          className={`${styles.List} ${primary ? styles.List_Primary : null}`}
        >
          {renderTaskItems()}
        </ul>
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
