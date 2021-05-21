import Loader from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import TrelloBoard from "react-trello";
import styles from "./ProjectPage.module.css";
import { connect, useDispatch } from "react-redux";
import { isEqual } from "lodash";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

import AddMember_Icon from "../../assets/AddMember_Icon.svg";
import agent from "../../actions/agent";
import SearchBar from "../SearchBar/SearchBar";
import UserPortrait from "../../assets/UserPortrait.svg";

const mapStateToProps = (state) => {
  return { currentUser: state.userReducer, project: state.kanbanReducer };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (projectName, toggleHasFetched) =>
    agent.KanbanAPI.get(dispatch, projectName, toggleHasFetched),
  onUpdate: (projectName, newData) =>
    agent.KanbanAPI.edit(dispatch, projectName, newData),
});

// TODO check if it is possible to attach a CSS sheet to an inline-style
const ProjectPage = ({
  currentUser,
  project,
  onLoad,
  onUpdate,
  setHeaderName,
}) => {
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

  const renderMembers = () => {
    return project.project.members.map((member) => {
      const { username } = member;

      return (
        <Link to={`/userprofile/${username}`}>
          <img src={UserPortrait} alt="User" title={`${username}`} />
        </Link>
      );
    });
  };
  return hasFetched ? (
    <section className={styles.ProjectPage}>
      <div className={styles.ProjectBar}>
        <div className={styles.ProjectBar_Members}>
          <span>Project Members: </span>
          <Link to={`/userprofile/${currentUser.username}`}>
            <img src={UserPortrait} alt="User" title="You" />
          </Link>
          {renderMembers()}
          <img
            src={AddMember_Icon}
            alt="Add A New Member"
            title="Add a New Member"
          />
        </div>
        <div className={styles.ProjectBar_SearchBar}>
          <SearchBar />
        </div>
      </div>
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
