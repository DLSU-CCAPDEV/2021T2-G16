import axios from "axios";
import Loader from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import { isEqual } from "lodash";
import styles from "./ProjectPreviewList.module.css";

import ProjectPreviewItem from "./ProjectPreviewItem/ProjectPreviewItem";

const ProjectPreviewList = ({
  noTreshold,
  horizontalScroll,
  onlyFavourites,
}) => {
  const [projectItems, setProjectItems] = useState(null);

  useEffect(async () => {
    //  TODO Display "Error" design when error promise
    await axios
      .get("/api/projects", {
        headers: {
          Authorization: `Bearer  `,
        },
      })
      .then((response) => {
        if (!isEqual(response.data, projectItems))
          setProjectItems(response.data);
      });
  });

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
    <div className={styles.ProjectPreviewList}>
      {projectItems ? (
        renderProjectItems()
      ) : (
        <div className={styles.ProjectPreviewList_Loader}>
          <Loader type="Oval" color="gainsboro" height={100} width={100} />
        </div>
      )}
    </div>
  );
};

export default ProjectPreviewList;
