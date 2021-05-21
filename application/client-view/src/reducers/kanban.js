const initialState = {
  loading: false,
  project: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "KANBAN_FETCH_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "KANBAN_FETCH_SUCCESS": {
      return {
        loading: false,
        project: action.payload,
      };
    }
    case "KANBAN_UNLOAD": {
      return {
        ...state,
        project: null,
      };
    }
    case "KANBAN_UPDATE": {
      const newProject = state.project;
      newProject.kanbanData = action.payload;

      return {
        ...state,
        project: newProject,
      };
    }
    default:
      return state;
  }
};
