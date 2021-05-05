import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./ProjectPreviewList.module.css";

import ProjectPreviewItem from "./ProjectPreviewItem/ProjectPreviewItem";

const ProjectPreviewList = ({
  noTreshold,
  horizontalScroll,
  onlyFavourites,
}) => {
  const [projectItems, setProjectItems] = useState([]);

  useEffect(async () => {
    await axios
      .get("/api/projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setProjectItems(response.data);
      });
  }, []);

  const projectPreviewListWidth = 900;
  const projectPreviewItemWidth = 205;
  const maximumTreshold =
    (projectPreviewListWidth - projectPreviewItemWidth) /
    projectPreviewItemWidth;

  const renderProjectItems = () => {
    return [
      !onlyFavourites && horizontalScroll && <ProjectPreviewItem newProject />,
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
      !onlyFavourites && !horizontalScroll && <ProjectPreviewItem newProject />,
    ];
  };

  return (
    <div className={styles.ProjectPreviewList}>{renderProjectItems()}</div>
  );
};

const mapStateToProps = (state) => {
  const { projectReducer, currentUserReducer } = state;
  return {
    projectItems: projectReducer.filter((item) => {
      return item.uniqueID === currentUserReducer.uniqueID;
    }),
  };
};

export default connect(mapStateToProps)(ProjectPreviewList);
