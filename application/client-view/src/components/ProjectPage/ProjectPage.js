import Loader from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import TrelloBoard from "react-trello";
import styles from "./ProjectPage.module.css";
import { connect, useDispatch } from "react-redux";
import { isEqual } from "lodash";
import { useParams } from "react-router";

import agent from "../../actions/agent";

const mapStateToProps = (state) => {
  return { project: state.kanbanReducer };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (projectName, toggleHasFetched) =>
    agent.KanbanAPI.get(dispatch, projectName, toggleHasFetched),
  onUpdate: (projectName, newData) =>
    agent.KanbanAPI.edit(dispatch, projectName, newData),
});

// TODO check if it is possible to attach a CSS sheet to an inline-style
const ProjectPage = ({ project, onLoad, onUpdate, setHeaderName }) => {
  const [hasFetched, toggleHasFetched] = useState(false);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    if (!project.project) {
      onLoad(slug, toggleHasFetched);
      setHeaderName("Project: " + slug);
    }

    return () => {
      dispatch({ type: "KANBAN_UNLOAD" });
    };
  }, []);

  return hasFetched ? (
    <section className={styles.ProjectPage}>
      <TrelloBoard
        data={project.project.kanbanData}
        draggable
        cardDraggable
        laneDraggable
        editable
        canAddLanes
        editLaneTitle
        onDataChange={(newData) => {
          if (!isEqual(project.project.kanbanData, newData)) {
            const { projectName } = project.project;

            onUpdate(projectName, newData);
          }
        }}
        style={{
          backgroundColor: "#F6F8F9",
          overflow: "auto",
          overflowY: "hidden",
        }}
        cardStyle={{
          backgroundColor: "white",
          borderRadius: "5px",
          maxWidth: "100wh",
        }}
        laneStyle={{}}
        components={
          {
            // NewLaneSection: () => {},
          }
        }
      />
    </section>
  ) : (
    <div className={styles.ProjectPage__loader}>
      <Loader type="Oval" color="gainsboro" height={200} width={200} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
