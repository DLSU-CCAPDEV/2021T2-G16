import { combineReducers } from "redux";

import projects from "./projects";
import tasks from "./tasks";

export default combineReducers({
  projectReducer: projects,
  taskReducer: tasks,
});
