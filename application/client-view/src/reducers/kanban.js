const initialState = {
  hasFetched: false,
  loading: false,
  board: null,
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
        hasFetched: true,
        loading: false,
        board: action.payload,
      };
    }
    case "KANBAN_UNLOAD": {
      return {
        ...state,
        hasFetched: false,
        board: null,
      };
    }
    case "KANBAN_UPDATE": {
      const newProject = state.board;
      newProject.kanbanData = action.payload;

      return {
        ...state,
        board: newProject,
      };
    }
    case "PROJECT_UPDATE": {
      const { kanban } = action.payload;

      return {
        ...state,
        board: kanban,
      };
    }
    default:
      return state;
  }
};
