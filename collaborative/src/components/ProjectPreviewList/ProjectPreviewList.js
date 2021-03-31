import React from "react";
import { connect } from "react-redux";
import ProjectPreviewItem from "./ProjectPreviewItem/ProjectPreviewItem";
import styles from "./ProjectPreviewList.module.css";

const ProjectPreviewList = ({
  projectItems = [],
  noTreshold,
  horizontalScroll,
}) => {
  const projectPreviewListWidth = 900;
  const projectPreviewItemWidth = 205;
  const maximumTreshold =
    (projectPreviewListWidth - projectPreviewItemWidth) /
    projectPreviewItemWidth;

  const renderProjectItems = () => {
    return [
      ...projectItems.map((item, index) => {
        return (index + 1 > maximumTreshold || index === projectItems.length) &&
          !horizontalScroll ? null : (
          <div>
            <ProjectPreviewItem itemProp={item} />
          </div>
        );
      }),
      noTreshold ? null : <ProjectPreviewItem newProject />,
    ];
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
