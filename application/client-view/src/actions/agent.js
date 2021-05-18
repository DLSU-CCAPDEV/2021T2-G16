import axios from "axios";

var authenticationHeader = localStorage.getItem("accessToken")
  ? {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  : null;
var loadAccessToken = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

const TaskAPI = {
  get: async (dispatch) => {
    dispatch({ type: "TASK_FETCH_REQUEST" });

    await axios.get("/api/tasks/get", authenticationHeader).then((res) => {
      dispatch({ type: "TASK_FETCH_SUCCESS", payload: res.data });
    });
  },
  create: async (dispatch, taskData) => {
    const queryString = new URLSearchParams(taskData).toString();

    await axios
      .post("/api/tasks/create", queryString, authenticationHeader)
      .then((res) => {
        dispatch({ type: "TASK_CREATE", payload: taskData });
      });
  },
  edit: async (dispatch, taskData) => {
    const queryString = new URLSearchParams(taskData).toString();

    await axios
      .post("/api/tasks/update", queryString, authenticationHeader)
      .then((res) => {
        dispatch({ type: "TASK_UPDATE", payload: taskData });
      });
  },
  delete: async (dispatch, taskData) => {
    const queryString = new URLSearchParams(taskData).toString();

    await axios
      .post("/api/tasks/delete", queryString, authenticationHeader)
      .then((res) => {
        dispatch({ type: "TASK_DELETE", payload: taskData });
      });
  },
};

const ProjectAPI = {
  get: async (dispatch) => {
    dispatch({ type: "PROJECT_FETCH_REQUEST" });

    await axios
      .get("/api/projects/get", authenticationHeader)
      .then((res) =>
        dispatch({ type: "PROJECT_FETCH_SUCCESS", payload: res.data })
      );
  },
};

const UserAPI = {
  login: (accessToken) => {
    authenticationHeader = loadAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
  },
  logout: () => {
    authenticationHeader = null;
    localStorage.removeItem("accessToken");
  },
};

export default {
  ProjectAPI,
  TaskAPI,
  UserAPI,
};
