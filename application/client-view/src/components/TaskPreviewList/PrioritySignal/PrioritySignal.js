import React from "react";
import styles from "./PrioritySignal.module.css";

const PrioritySignal = ({ high, medium, low }) => {
  console.log("Rendered");
  const renderDesign = () => {
    if (high) {
      return styles.High;
    } else if (medium) {
      return styles.Medium;
    } else if (low) {
      return styles.Low;
    }
  };

  const renderText = () => {
    if (high) {
      return "High";
    } else if (medium) {
      return "Medium";
    } else if (low) {
      return "Low";
    }
  };

  return (
    <div className={`${styles.PrioritySignal} ${renderDesign()}`}>
      {renderText()}
    </div>
  );
};

export default PrioritySignal;
