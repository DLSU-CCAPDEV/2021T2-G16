import React from "react";
import { connect } from "react-redux";
import ProjectPreviewList from "../ProjectPreviewList/ProjectPreviewList";
import styles from "./ProjectOverviewPage.module.css";

const ProjectOverviewPage = ({ projectItems }) => {
  return (
    <section className={`scopedPage ${styles.ProjectOverviewPage}`}>
      <div className={styles.List}>
        <div className={styles.ListHeader}>
          <div className={styles.ListHeader_Divider}>
            <div className={styles.ListHeader_Text}>
              {/* <img
                src={Project_Icon__Black}
                alt="Project_Icon"
                className={styles.ProjectIcon}
              /> */}
              <span>Favourite Boards</span>
            </div>
            <hr />
          </div>
        </div>
        <ProjectPreviewList noTreshold horizontalScroll />
      </div>
    </section>
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

export default connect(mapStateToProps)(ProjectOverviewPage);
