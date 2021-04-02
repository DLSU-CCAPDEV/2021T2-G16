import React from "react";
import { connect } from "react-redux";

const ProjectPage = ({ projectItems }) => {
  return <section>{console.log("Went here")}</section>;
};

const mapStateToProps = (state) => {
  const { projectReducer, currentUserReducer } = state;

  return {
    projectItems: projectReducer.filter(
      (item) => item.uniqueID === currentUserReducer.uniqueID
    ),
  };
};

export default connect(mapStateToProps)(ProjectPage);
