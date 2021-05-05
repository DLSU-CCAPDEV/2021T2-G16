import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import HomePage_Logo from "../../assets/HomePage_Logo.svg";
import Project_Icon__Black from "../../assets/Projects_Icon__Black.svg";
import ProjectPreviewList from "../ProjectPreviewList/ProjectPreviewList";
import TaskPrevewList from "../TaskPreviewList/TaskPreviewList";
import Tasks_Icon__Black from "../../assets/Tasks_Icon__Black.svg";
import styles from "../HomePage/HomePage.module.css";

const HomePage = () => {
  // const handleOnEdit = useCallback(() => history.push("/tasks"), [history]);

  const handleOnClickEdit = () => {
    // handleOnEdit();
    //  TODO pass the respective task item
  };

  return (
    <section className={`narrowPage minisculePage ${styles.HomePage}`}>
      <div className={styles.Header}>
        <img src={HomePage_Logo} alt="Your Workspace" />
        <div className={styles.Header_Text}>
          <h1>Welcome to your workstation!</h1>
          <p>
            Collaborative provides you with your own battlestation. Through this
            page, you can overseer your upcoming tasks, and access your utmost
            important projects.
          </p>
        </div>
      </div>
      <div className={styles.List}>
        <div className={styles.ListHeader}>
          <div className={styles.ListHeader_Divider}>
            <div className={styles.ListHeader_Text}>
              <img
                src={Project_Icon__Black}
                alt="Project_Icon"
                className={styles.ProjectIcon}
              />
              <span>Projects</span>
              <Link to="/projects">See all my projects</Link>
            </div>
            <hr />
          </div>
        </div>
        <ProjectPreviewList />
      </div>
      <div className={styles.List}>
        <div className={styles.ListHeader}>
          <div className={styles.ListHeader_Divider}>
            <div className={styles.ListHeader_Text}>
              <img
                src={Tasks_Icon__Black}
                alt="Tasks_Icon"
                className={styles.TaskIcon}
              />
              <span>My Tasks</span>
              <Link to="/tasks">See all my tasks</Link>
            </div>
            <hr />
          </div>
          <TaskPrevewList handleOnClick={handleOnClickEdit} />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
