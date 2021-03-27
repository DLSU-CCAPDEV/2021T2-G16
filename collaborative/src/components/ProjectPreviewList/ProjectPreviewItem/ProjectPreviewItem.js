import React, { useState } from "react";
import styles from "./ProjectPreviewItem.module.css";
import "./ProjectPreview.css";

const ProjectPreviewItem = ({ itemProp }) => {
  const [isHoveredOn, toggleHover] = useState(false);

  return (
    <div
      title={itemProp.projectName}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
      className={`${styles.ProjectPreviewItem} ${
        isHoveredOn
          ? styles.ProjectPreviewItem__active
          : styles.ProjectPreviewItem__inactive
      }`}
    >
      <div className={styles.Picture} />
      <span
        className={`${styles.Title} ${
          isHoveredOn ? styles.Title__active : styles.Title__inactive
        }`}
      >
        {itemProp.projectName}
      </span>
    </div>
  );
};

export default ProjectPreviewItem;
