import * as Yup from "yup";
import axios from "axios";
import Loader from "react-loader-spinner";
import Popup from "reactjs-popup";
import React, { useCallback, useEffect, useState } from "react";
import TrelloBoard from "react-trello";
import styles from "./ProjectPage.module.css";
import { connect, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { isEqual } from "lodash";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";

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
  onProjectDelete: (kanban) => agent.ProjectAPI.delete(dispatch, kanban),
  onAddMember: (userToBeAdded, kanban) =>
    agent.KanbanAPI.addMember(dispatch, userToBeAdded, kanban),
  onRemoveMember: (userToBeRemoved, kanban) =>
    agent.KanbanAPI.removeMember(dispatch, userToBeRemoved, kanban),
});

const searchSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required.")
    .trim("")
    .matches(
      /^[A-Za-z0-9]*$/,
      "Usernames must only be Latin Characters and Digits."
    )
    .min(5, "Username is too short - at least 5 characters.")
    .test("Username-Exists", "User does not exist.", async (username) => {
      const response = await axios
        .post("/api/checkUsernameAvailability", { username })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });

      return response.status !== 200;
    }),
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
  onAddMember,
  onProjectUpdate,
  onProjectDelete,
  onRemoveMember,
  setHeaderName,
}) => {
  const [isEditProjectModalEnabled, setEditProjectModalEnabled] =
    useState(false);
  const [isAddMemberModalEnabled, setAddMemberModalEnabled] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectUser = useCallback(() => history.push("/projects"), [history]);
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

              redirectUser();
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
                  <hr />
                  <RowDivision>
                    <div
                      className={styles.DeleteProject}
                      onClick={() => {
                        onProjectDelete(kanban.board);

                        setEditProjectModalEnabled(false);
                        redirectUser();
                      }}
                    >
                      Delete this Project
                    </div>
                  </RowDivision>
                </Division>
              </Division>
            </Form>
          </Formik>
        </FormDesign>
      </Popup>
    );
  };

  const renderMembersInAddMemberModel = () =>
    kanban.board.members.map((member, index) => {
      const { username } = member;

      return (
        <li className={`${styles.AddMembersForm__Member}`}>
          <Link to={`/userprofile/${username}`}>
            <img src={UserPortrait} alt="User" title={`${username}`} />
          </Link>
          <p>{username}</p>
          <div className={styles.AddMembersForm__Member__Delete}>
            <img
              src={CloseButton}
              alt="Close Button"
              onClick={() => onRemoveMember(username, kanban.board)}
            />
          </div>
          <hr />
        </li>
      );
    });

  const renderAddMemberModal = () => {
    return (
      <Popup
        open={isAddMemberModalEnabled}
        modal
        closeOnEscape={false}
        overlayStyle={{ backgroundColor: "rgba(29, 24, 37, 0.836)" }}
        position="center center"
        onClose={() => setAddMemberModalEnabled(false)}
      >
        <div className={`${styles.ProjectPage_Form} ${styles.AddMembersForm}`}>
          <div className={styles.AddMembersForm__Content}>
            <div className={styles.AddMembersForm__Headers}>
              <h2>Project Members</h2>
              <img
                src={CloseButton}
                alt="Close Button"
                onClick={() => setAddMemberModalEnabled(false)}
                style={{
                  cursor: "pointer",
                  width: "30px",
                  height: "30px",
                }}
              />
            </div>
            <hr />
            <ul className={styles.AddMembersForm__MembersList}>
              <li className={styles.AddMembersForm__Member}>
                <img
                  src={UserPortrait}
                  alt="User"
                  title={currentUser.username}
                />
                <p>{`Owner`}</p>
              </li>
              {renderMembersInAddMemberModel()}
            </ul>
          </div>
          <hr />
          <div className={styles.AddMembersForm__AddMemberBar}>
            <div className={styles.AddMemberBar__Header}>
              <h3>Add Member</h3>
            </div>
            <div>
              <FormDesign className={styles.SearchBar}>
                <Formik
                  initialValues={{ username: "" }}
                  validationSchema={searchSchema}
                  onSubmit={(usernameToBeAdded, { resetForm }) => {
                    onAddMember(usernameToBeAdded, kanban.board);
                    resetForm();
                  }}
                >
                  <Form>
                    <RowDivision className={styles.SearchBar_Submit}>
                      <FieldWithError
                        name="username"
                        type="text"
                        placeholder="Their Username"
                      />
                      <Field type="submit" value="Send Invitation" />
                    </RowDivision>
                  </Form>
                </Formik>
              </FormDesign>
            </div>
          </div>
        </div>
      </Popup>
    );
  };

  const renderMembersInBar = () => {
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
      {renderAddMemberModal()}
      {renderEditProjectModal()}
      <div className={styles.ProjectBar}>
        <div className={styles.ProjectBar_Members}>
          <span>Project Members: </span>
          <img src={UserPortrait} alt="User" title={`Owner`} />
          {renderMembersInBar()}
          {/* TODO Actual Authorization */}
          {currentUser.uniqueID === kanban.board.uniqueID ? (
            <img
              src={AddMember_Icon}
              alt="Add A New Member"
              title="Add a New Member"
              onClick={() => setAddMemberModalEnabled(true)}
            />
          ) : null}
        </div>
        {currentUser.uniqueID === kanban.board.uniqueID ? (
          <div className={styles.ProjectBar_Settings}>
            <img
              src={Gear}
              alt="Settings"
              onClick={() => {
                setEditProjectModalEnabled(true);
              }}
            />
          </div>
        ) : null}
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
