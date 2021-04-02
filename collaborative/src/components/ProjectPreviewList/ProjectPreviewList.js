import React from "react";
import { connect } from "react-redux";
import ProjectPreviewItem from "./ProjectPreviewItem/ProjectPreviewItem";
import styles from "./ProjectPreviewList.module.css";

const ProjectPreviewList = ({
  projectItems = [],
  noTreshold,
  horizontalScroll,
  onlyFavourites,
}) => {
  const projectPreviewListWidth = 900;
  const projectPreviewItemWidth = 205;
  const maximumTreshold =
    (projectPreviewListWidth - projectPreviewItemWidth) /
    projectPreviewItemWidth;

  const renderProjectItems = () => {
    return [
      ...projectItems.map((item, index) => {
        if (
          (index + 1 < maximumTreshold || horizontalScroll || noTreshold) &&
          ((onlyFavourites && item.favoured) || !onlyFavourites)
        ) {
          return (
            <div>
              <ProjectPreviewItem itemProp={item} />
            </div>
          );
        } else {
          return null;
        }
      }),
      !onlyFavourites && <ProjectPreviewItem newProject />,
    ];
  };

  return (
    <div className={styles.ProjectPreviewList}>{renderProjectItems()}</div>
  );
};

const mapStateToProps = (state) => {
  const { projectReducer, currentUserReducer } = state;
  console.table(projectReducer);
  return {
    projectItems: projectReducer.filter((item) => {
      return item.uniqueID === currentUserReducer.uniqueID;
    }),
  };
};

export default connect(mapStateToProps)(ProjectPreviewList);
