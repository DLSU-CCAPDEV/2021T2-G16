import axios from "axios";
import React, { useEffect, useState } from "react";
import Confetti from "../../assets/Confetti.svg";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { taskDelete } from "../../actions";

import TaskPreviewItem from "./TaskPreviewItem/TaskPreviewItem";
import styles from "./TaskPreviewList.module.css";

const TaskPreviewList = ({ taskDelete, primary, handleOnClick }) => {
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    //  TODO Display "Error" design when error promise
    axios
      .get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setTaskItems(response.data);
      });
  }, []);

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
                  handleOnClick={handleOnClick}
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
      {taskItems.length >= 1 ? (
        <ul
          className={`${styles.List} ${
            primary ? styles.List__Primary : styles.List__Secondary
          }`}
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
