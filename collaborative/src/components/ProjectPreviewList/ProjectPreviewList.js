import React from "react";
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

        return counter < maximumTreshold ? (
          <ProjectPreviewItem itemProp={item} />
        ) : (
          <ProjectPreviewItem itemProp={item} newProject />
        );
      });
    } else {
      // TODO check if renderedItems is needed
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
  const { projectReducer, currentUserReducer } = state;

  return {
    projectItems: projectReducer.filter(
      (item) => item.uniqueID === currentUserReducer.uniqueID
    ),
  };
};

export default connect(mapStateToProps)(ProjectPreviewList);
