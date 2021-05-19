import { combineReducers } from "redux";

import projects from "./projects";
import tasks from "./tasks";
import user from "./user";

export default combineReducers({
  projectReducer: projects,
  taskReducer: tasks,
  userReducer: user,
});
