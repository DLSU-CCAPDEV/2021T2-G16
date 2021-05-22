import * as Yup from "yup";
import Loader from "react-loader-spinner";
import Popup from "reactjs-popup";
import React, { useEffect, useState } from "react";
import TrelloBoard from "react-trello";
import styles from "./ProjectPage.module.css";
import { connect, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { isEqual } from "lodash";
import { Link } from "react-router-dom";
import { Redirect, useParams } from "react-router";

import AddMember_Icon from "../../assets/AddMember_Icon.svg";
import agent from "../../actions/agent";
import Button from "../Button/Button";
import CloseButton from "../../assets/CloseButton.svg";
import Gear from "../../assets/Gear.svg";
import UserPortrait from "../../assets/UserPortrait.svg";
import {
  Division,
  FormDesign,
  FieldWithError,
  RowDivision,
} from "../FormDesign/FormDesign";

const mapStateToProps = (state) => {
  return { currentUser: state.userReducer, kanban: state.kanbanReducer };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (projectName) => agent.KanbanAPI.get(dispatch, projectName),
  onKanbanUpdate: (projectName, newData) =>
    agent.KanbanAPI.edit(dispatch, projectName, newData),
  onProjectUpdate: (oldProjectName, projectData, kanban) =>
    agent.ProjectAPI.edit(dispatch, oldProjectName, projectData, kanban),
});

const projectSchema = Yup.object().shape({
  projectName: Yup.string()
    .required("Project must have a name")
    .min(5, "Project name is too short - at least 5 characters.")
    .max(40, "Project name is too long - at most 40 characters."),
  projectDescription: Yup.string(),
  projectPriority: Yup.number(),
});

// TODO check if it is possible to attach a CSS sheet to an inline-style
const ProjectPage = ({
  currentUser,
  kanban,
  onLoad,
  onKanbanUpdate,
  onProjectUpdate,
  setHeaderName,
}) => {
  const [isEditProjectModalEnabled, setEditProjectModalEnabled] =
    useState(false);
  const [isAddMemberModalEnabled, setAddMemberModalEnabled] = useState(false);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    if (!kanban.hasFetched) {
      setHeaderName("Project: " + slug);
      onLoad(slug);
    }

    return () => {
      dispatch({ type: "KANBAN_UNLOAD" });
    };
  }, []);

  const renderEditProjectModal = () => {
    return (
      <Popup
        open={isEditProjectModalEnabled}
        modal
        closeOnEscape={false}
        overlayStyle={{ backgroundColor: "rgba(29, 24, 37, 0.836)" }}
        position="center center"
        onClose={() => setEditProjectModalEnabled(false)}
      >
        <FormDesign width="500px" className={styles.ProjectPage_Form}>
          <Formik
            initialValues={{
              projectName: kanban.board.projectName,
              description: kanban.board.description,
              backgroundID: kanban.board.backgroundID,
            }}
            validationSchema={projectSchema}
            onSubmit={(newProjectData) => {
              const { projectName } = kanban.board;

              onProjectUpdate(projectName, newProjectData, kanban.board);

              setEditProjectModalEnabled(false);
            }}
          >
            <Form>
              <Division>
                <img
                  src={CloseButton}
                  alt="Close Button"
                  onClick={() => setEditProjectModalEnabled(false)}
                  style={{
                    alignSelf: "flex-end",
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                  }}
                />
                <Division gap="20px">
                  <h1>Edit Project</h1>
                  <FieldWithError
                    name="projectName"
                    type="text"
                    placeHolder="Project Name"
                  />
                  <Division gap="10px">
                    <label>Project Description</label>
                    <Field
                      name="description"
                      as="textarea"
                      placeHolder="Your Project Description"
                    />
                  </Division>
                  <RowDivision>
                    <label>Background Image</label>
                    <Field name="backgroundID" as="select">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Field>
                  </RowDivision>
                  <Field type="submit" value="Save Edited Project" />
                  {/* <hr />
                  <RowDivision>
                    <label>Delete this Project</label>
                    <Button backgroundColor="#35C53F" color="white" primary />
                  </RowDivision> */}
                </Division>
              </Division>
            </Form>
          </Formik>
        </FormDesign>
      </Popup>
    );
  };

  const renderMembers = () => {
    return kanban.board.members.map((member) => {
      const { username } = member;

      return (
        <Link to={`/userprofile/${username}`}>
          <img src={UserPortrait} alt="User" title={`${username}`} />
        </Link>
      );
    });
  };

  return kanban.board ? (
    <section className={styles.ProjectPage}>
      {renderEditProjectModal()}
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
        <div className={styles.ProjectBar_Settings}>
          <img
            src={Gear}
            alt="Settings"
            onClick={() => {
              setEditProjectModalEnabled(true);
            }}
          />
        </div>
      </div>
      <TrelloBoard
        data={kanban.board.kanbanData}
        draggable
        cardDraggable
        laneDraggable
        editable
        canAddLanes
        editLaneTitle
        onDataChange={(newData) => {
          if (!isEqual(kanban.board.kanbanData, newData)) {
            const { projectName } = kanban.board;

            onKanbanUpdate(projectName, newData);
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
