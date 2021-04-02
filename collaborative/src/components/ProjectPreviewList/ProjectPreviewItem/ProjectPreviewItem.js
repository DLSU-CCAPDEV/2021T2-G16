import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formalizeProjectName } from "../../../logic";
import styles from "./ProjectPreviewItem.module.css";

const ProjectPreviewItem = ({ itemProp, newProject }) => {
  const [isHoveredOn, toggleHover] = useState(false);

  const renderBackground = () => {
    switch (itemProp.backgroundID) {
      case "1":
        return styles.ProjectPreviewItem__1;
      case "2":
        return styles.ProjectPreviewItem__2;
      case "3":
        return styles.ProjectPreviewItem__3;
      default:
        return styles.ProjectPreviewItem__default;
    }
  };

  return (
    <Link
      to={
        newProject
          ? "/projects/project=new"
          : `/projects/project=${formalizeProjectName(itemProp.projectName)}`
      }
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
          newProject
            ? styles.ProjectPreviewItem__NewProject
            : renderBackground()
        }`}
      />
      <span
        className={`${styles.Title} ${
          isHoveredOn ? styles.Title__active : styles.Title__inactive
        }`}
      >
        {newProject ? "New Project" : itemProp.projectName}
      </span>
    </Link>
  );
};

export default ProjectPreviewItem;
