import React from "react";
import { connect } from "react-redux";
import styles from "./ProjectOverviewPage.module.css";

const ProjectOverviewPage = ({ userProjects }) => {
  return <section className={styles.ProjectOverviewPage}></section>;
};

export default connect()(ProjectOverviewPage);
