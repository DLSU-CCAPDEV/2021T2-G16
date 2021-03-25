import React from "react";
import { connect } from "react-redux";
import ProjectPreviewItem from "./ProjectPreviewItem/ProjectPreviewItem";
import styles from "./ProjectPreviewList.module.css";

const ProjectPreviewList = ({ primary, projectItems }) => {
  const renderItems = projectItems.map((item) => <ProjectPreviewItem />);

  return <div>{console.table(projectItems)}</div>;
  //   return <div>{renderItems}</div>;
};

const mapStateToProps = (state) => {
  const { projectDatabaseUser, currentUserReducer } = state;

  return {
    projectItems: projectDatabaseUser.find(
      item.userEmail === currentUserReducer
    ),
  };
};

export default connect(mapStateToProps)(ProjectPreviewList);
