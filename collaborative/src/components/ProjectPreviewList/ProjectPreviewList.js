import React from "react";
import { connect } from "react-redux";
import ProjectPreviewItem from "./ProjectPreviewItem/ProjectPreviewItem";
import styles from "./ProjectPreviewList.module.css";

const ProjectPreviewList = ({ primary, projectItems = [] }) => {
  // return <div>{() => projectItems.map((item) => <ProjectPreviewItem />)}</div>;
  console.log(projectItems);
  return (
    <div>
      <h1>{projectItems.description}</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { projectDatabaseReducer, currentUserReducer } = state;

  return {
    projectItems: projectDatabaseReducer.find(
      (item) => item.emailInput === currentUserReducer.emailInput
    ),
  };
};

export default connect(mapStateToProps)(ProjectPreviewList);
