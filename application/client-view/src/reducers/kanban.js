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
    case "KANBAN_UPDATE": {
      return {
        project: action.payload,
      };
    }
    default:
      return state;
  }
};
