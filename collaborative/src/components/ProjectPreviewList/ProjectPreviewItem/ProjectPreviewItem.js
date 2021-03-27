import React from "react";
import styles from "./ProjectPreviewItem.module.css";

const ProjectPreviewItem = ({ itemProp }) => {
  return (
    <div className={styles.ProjectPreviewItem}>
      <div className={styles.Picture} />
      <span className={styles.Title} title={itemProp.projectName}>
        {itemProp.projectName}
      </span>
    </div>
  );
};

export default ProjectPreviewItem;
