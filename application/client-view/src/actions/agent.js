import axios from "axios";
import { delay } from "lodash";

var authenticationHeader = null;

const logout = () => {
  setToken(null);
  localStorage.removeItem("accessToken");
};
const login = (accessToken) => {
  setToken(accessToken);
  localStorage.setItem("accessToken", accessToken);
};
const setToken = (accessToken) => {
  authenticationHeader = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

const KanbanAPI = {
  get: async (dispatch, projectName, toggleHasFetched) => {
    const queryString = new URLSearchParams({
      projectName,
    }).toString();

    dispatch({ type: "KANBAN_FETCH_REQUEST" });

    const myHeader = authenticationHeader;
    myHeader["headers"]["Content-Type"] = "application/x-www-form-urlencoded";

    await axios.post("/api/projects/get", queryString, myHeader).then((res) => {
      dispatch({ type: "KANBAN_FETCH_SUCCESS", payload: res.data });
      toggleHasFetched(true);
    });
  },
  edit: async (dispatch, projectName, newData) => {
    const queryJSON = JSON.stringify({
      projectName,
      newData,
    });

    const myHeader = authenticationHeader;
    myHeader["headers"]["Content-Type"] = "application/json";

    await axios
      .post("/api/projects/kanban/update", queryJSON, myHeader)
      .then((res) => {
        dispatch({ type: "KANBAN_UPDATE", payload: newData });
      });
  },
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
  create: async (dispatch, projectData) => {
    const queryString = new URLSearchParams(projectData).toString();

    await axios
      .post("/api/projects/create", queryString, authenticationHeader)
      .then((res) => {
        dispatch({ type: "PROJECT_CREATE", payload: projectData });
      });
  },
};

const UserAPI = {
  //  TODO Centralized login methods
  login: async (dispatch, formData) => {
    const queryString = new URLSearchParams(formData).toString();
    const responseStatus = await axios
      .post("/api/loginUser", queryString)
      .then((res) => {
        logout();
        login(res.data.accessToken);

        dispatch({
          type: "USER_LOGIN",
          payload: { username: res.data.username, uniqueID: res.data.uniqueID },
        });

        return res.status;
      })
      .catch((error) => {
        return error.response.status;
      });

    return Promise.resolve(responseStatus);
  },
  logout: (dispatch) => {
    logout();
    dispatch({ type: "USER_LOGOUT" });
  },
};

const ConfigurationAPI = {
  onLoad: async (dispatch) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      login(accessToken);
      await axios.get("/api/users/get", authenticationHeader).then((res) => {
        dispatch({ type: "USER_LOGIN", payload: res.data });
      });
    }
  },
};

export default {
  ConfigurationAPI,
  KanbanAPI,
  ProjectAPI,
  TaskAPI,
  UserAPI,
};
