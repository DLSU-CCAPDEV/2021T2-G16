import React, { useState } from "react";
import styles from "./ProjectPreviewItem.module.css";
import "./ProjectPreview.css";

const ProjectPreviewItem = ({ itemProp, newProject }) => {
  const [isHoveredOn, toggleHover] = useState(false);

  return (
    <div
      title={newProject ? "New Project" : itemProp.projectName}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
      className={`${styles.ProjectPreviewItem} ${
        isHoveredOn
          ? styles.ProjectPreviewItem__active
          : styles.ProjectPreviewItem__inactive
      }`}
    >
      <div
        className={`${styles.Picture} ${
          newProject ? styles.Add : styles.Existing
        }`}
      />
      <span
        className={`${styles.Title} ${
          isHoveredOn ? styles.Title__active : styles.Title__inactive
        }`}
      >
        {newProject ? "New Project" : itemProp.projectName}
      </span>
    </div>
  );
};

export default ProjectPreviewItem;
