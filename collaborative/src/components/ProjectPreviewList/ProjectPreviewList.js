import React from "react";
import $ from "jquery";
import { connect } from "react-redux";
import ProjectPreviewItem from "./ProjectPreviewItem/ProjectPreviewItem";
import styles from "./ProjectPreviewList.module.css";

const ProjectPreviewList = ({ primary, projectItems = [] }) => {
  const projectPreviewListWidth = 900;
  const projectPreviewItemWidth = 205;
  const maximumTreshold =
    (projectPreviewListWidth - projectPreviewItemWidth) /
    projectPreviewItemWidth;

  const renderProjectItems = () => {
    if (projectItems.length >= maximumTreshold) {
      let counter = 0;

      return projectItems.map((item) => {
        counter++;
        console.log(counter + " < " + maximumTreshold);
        return counter < maximumTreshold ? (
          <ProjectPreviewItem itemProp={item} />
        ) : (
          <ProjectPreviewItem itemProp={item} newProject />
        );
      });
    } else {
      const renderedItems = [];

      return [
        ...renderedItems,
        projectItems.map((item) => {
          return <ProjectPreviewItem itemProp={item} />;
        }),
        <ProjectPreviewItem newProject />,
      ];
    }
  };

  return (
    <div className={styles.ProjectPreviewList}>{renderProjectItems()}</div>
  );
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
