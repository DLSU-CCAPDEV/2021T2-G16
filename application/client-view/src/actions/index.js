import axios from "axios";

export const projectCreate = ({ email, projectName, decsription, members }) => {
  return {
    type: "PROJECT_CREATE",
    payload: {
      email,
      projectName,
      decsription,
      members,
    },
  };
};

export const taskFetch = (accessToken) => async (dispatch) => {
  const response = await axios.get("/api/tasks", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  dispatch({ type: "TASK_FETCH", payload: response.data });
};

export const taskCreate = (
  accessToken,
  { taskName, taskDescription, priority }
) => async (dispatch) => {
  const queryString = new URLSearchParams({
    taskName,
    taskDescription,
    priority,
  }).toString();

  const response = await axios
    .post("/api/tasks/create", queryString, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {})
    .catch((error) => console.log(error));

  return {
    type: "TASK_CREATE",
    payload: { taskName, taskDescription, priority },
  };
};

export const taskDelete = (taskProp) => {
  return {
    type: "TASK_DELETE",
    payload: {
      taskProp,
    },
  };
};
