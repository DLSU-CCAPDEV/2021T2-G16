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

  return primary ? (
    <div
      className={`${styles.TaskPreviewList} ${styles.TaskPreviewList_Primary}`}
    >
      <div className={styles.Header}>
        <span className={styles.Header_name__Primary}>Task Name</span>
        <span
          className={`${styles.Header_Priority} ${styles.Header_Priority__Primary}`}
        >
          Priority
        </span>
      </div>
      <hr />
      {taskItems.length >= 1 ? (
        <ul className={`${styles.List} ${styles.List_Primary}`}>
          {renderTaskItems()}
        </ul>
      ) : (
        <div className={styles.Message}>
          <img src={Confetti} alt="Confetti!" />
          <span>Congratulations! You currently have no impending tasks.</span>
        </div>
      )}
    </div>
  ) : (
    <div
      className={`${styles.TaskPreviewList} ${styles.TaskPreviewList_Secondary}`}
    >
      <div className={styles.Header}>
        <span className={styles.Header_Name__Secondary}>Task Name</span>
        <span className={`${styles.Header_Priority}`}>Priority</span>
      </div>
      <hr />
      {taskItems.length >= 1 ? (
        <ul className={`${styles.List}`}>{renderTaskItems()}</ul>
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
