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
        console.table(item);
        if (
          (index + 1 > maximumTreshold ||
            index === projectItems.length ||
            (horizontalScroll && noTreshold)) &&
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
