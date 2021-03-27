import React from "react";
import { connect } from "react-redux";
import ProjectPreviewItem from "./ProjectPreviewItem/ProjectPreviewItem";
import styles from "./ProjectPreviewList.module.css";

const ProjectPreviewList = ({ primary, projectItems = [] }) => {
  const renderProjectItems = () => {
    return projectItems.map((item) => <ProjectPreviewItem itemProp={item} />);
  };

  return <div className={styles.ProjectPreviewList}>{renderProjectItems()}</div>;
};

const mapStateToProps = (state) => {
  const { projectDatabaseReducer, currentUserReducer } = state;

  return {
    projectItems: projectDatabaseReducer.filter(
      (item) => item.emailInput === currentUserReducer.emailInput
    ),
  };
};

export default connect(mapStateToProps)(ProjectPreviewList);
