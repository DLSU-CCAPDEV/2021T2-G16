import React from "react";
import { connect } from "react-redux";
import styles from "./ProjectPage.module.css";

const ProjectPage = ({ userProjects }) => {
  return <section className={styles.ProjectPage}></section>;
};

export default connect()(ProjectPage);
