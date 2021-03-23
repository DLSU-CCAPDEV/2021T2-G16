import React from "react";
import { connect } from "react-redux";
import styles from "./TaskPage.module.css";

const TaskPage = ({ userTasks }) => {
  return <section style={styles.TaskPage}></section>;
};

export default connect()(TaskPage);
