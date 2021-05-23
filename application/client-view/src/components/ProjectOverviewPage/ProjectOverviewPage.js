import React from "react";
import styles from "./ProjectOverviewPage.module.css";

import ProjectPreviewList from "../ProjectPreviewList/ProjectPreviewList";

const ProjectOverviewPage = () => {
  return (
    <section
      className={`narrowPage minisculePage ${styles.ProjectOverviewPage}`}
    >
      {/* <div className={styles.List}>
        <div className={styles.ListHeader}>
          <div className={styles.ListHeader_Divider}>
            <div className={styles.ListHeader_Text}>
              <span>Favourite Boards</span>
            </div>
            <hr />
          </div>
        </div>
        <ProjectPreviewList noTreshold horizontalScroll onlyFavourites />
      </div> */}
      <div className={styles.List}>
        <div className={styles.ListHeader}>
          <div className={styles.ListHeader_Divider}>
            <div className={styles.ListHeader_Text}>
              <span>All My Boards</span>
            </div>
            <hr />
          </div>
        </div>
        <ProjectPreviewList noTreshold horizontalScroll />
      </div>
    </section>
  );
};

export default ProjectOverviewPage;
