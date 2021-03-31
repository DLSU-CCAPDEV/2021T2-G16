import React from "react";
import { connect } from "react-redux";
import styles from "./ProjectOverviewPage.module.css";

const ProjectOverviewPage = ({ projectItems }) => {
  return (
    <section className={`scopedPage ${styles.ProjectOverviewPage}`}>a</section>
  );
};

const mapStateToProps = (state) => {
  const { projectReducer, currentUserReducer } = state;

  return {
    projectItems: projectReducer.filter(
      (item) => item.uniqueID === currentUserReducer.uniqueID
    ),
  };
};

export default connect(mapStateToProps)(ProjectOverviewPage);
