import axios from "axios";

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
  //  TODO Centralized login methods
  login: async (dispatch, formData) => {
    const queryString = new URLSearchParams(formData).toString();
    const responseStatus = await axios
      .post("/api/loginUser", queryString)
      .then((res) => {
        logout();
        login(res.data.accessToken);
        ConfigurationAPI.onLoad(dispatch);
        return res.status;
      })
      .catch((error) => {
        return error.response.status;
      });

    return Promise.resolve(responseStatus);
  },
  logout: () => {
    logout();
  },
};

const ConfigurationAPI = {
  onLoad: async (dispatch) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setToken(accessToken);

      await axios.get("/api/users/get", authenticationHeader).then((res) => {
        dispatch({ type: "APP_LOAD", payload: res.data });
      });
    }
  },
};

export default {
  ConfigurationAPI,
  ProjectAPI,
  TaskAPI,
  UserAPI,
};
