import { combineReducers } from "redux";

import kanban from "./kanban";
import projects from "./projects";
import tasks from "./tasks";
import user from "./user";

export default combineReducers({
  kanbanReducer: kanban,
  projectReducer: projects,
  taskReducer: tasks,
  userReducer: user,
});
