import Loader from "react-loader-spinner";
import React, { useEffect } from "react";
import styles from "./ProjectPreviewList.module.css";
import { connect } from "react-redux";

import agent from "../../actions/agent";
import ProjectPreviewItem from "./ProjectPreviewItem/ProjectPreviewItem";

const mapStateToProps = (state) => {
  return { projectItems: state.projectReducer };
};

const mapDispatchToState = (dispatch) => ({
  onLoad: () => agent.ProjectAPI.get(dispatch),
});

const ProjectPreviewList = ({
  onLoad,
  projectItems,
  noTreshold,
  horizontalScroll,
  onlyFavourites,
}) => {
  useEffect(() => {
    onLoad();
  }, []);

  const projectPreviewListWidth = 900;
  const projectPreviewItemWidth = 205;
  const maximumTreshold =
    (projectPreviewListWidth - projectPreviewItemWidth) /
    projectPreviewItemWidth;

  const renderProjectItems = () => {
    return [
      !onlyFavourites && horizontalScroll && <ProjectPreviewItem newProject />,
      ...projectItems.projects.map((item, index) => {
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
      !onlyFavourites && !horizontalScroll && <ProjectPreviewItem newProject />,
    ];
  };

  return (
    <div className={styles.ProjectPreviewList}>
      {projectItems.loading ? (
        <div className={styles.ProjectPreviewList_Loader}>
          <Loader type="Oval" color="gainsboro" height={100} width={100} />
        </div>
      ) : (
        renderProjectItems()
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToState)(ProjectPreviewList);
