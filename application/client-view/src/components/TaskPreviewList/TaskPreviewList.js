import axios from "axios";
import Confetti from "../../assets/Confetti.svg";
import Loader from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import { isEqual } from "lodash";
import { Link } from "react-router-dom";

import TaskPreviewItem from "./TaskPreviewItem/TaskPreviewItem";
import styles from "./TaskPreviewList.module.css";

const TaskPreviewList = ({ taskDelete, primary, handleOnClick }) => {
  const [taskItems, setTaskItems] = useState(null);

  useEffect(async () => {
    //  TODO Display "Error" design when error promise
    await axios
      .get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (!isEqual(response.data, taskItems)) {
          setTaskItems(response.data);
        }
      });
  });

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
      {taskItems ? (
        taskItems.length >= 1 ? (
          <ul
            className={`${styles.List} ${
              primary ? styles.List__Primary : styles.List__Secondary
            }`}
          >
            {renderTaskItems()}
          </ul>
        ) : (
          <div
            className={`${styles.Message} ${styles.TaskPreviewList_Display}`}
          >
            <img src={Confetti} alt="Confetti!" />
            <span>Congratulations! You currently have no impending tasks.</span>
          </div>
        )
      ) : (
        <div className={`${styles.Message} ${styles.TaskPreviewList_Display}`}>
          <Loader type="Grid" color="gainsboro" height={100} width={100} />
        </div>
      )}
    </div>
  );
};

export default TaskPreviewList;
