const initialState = {
  loading: false,
  projects: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "PROJECT_FETCH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "PROJECT_FETCH_SUCCESS":
      return {
        loading: false,
        projects: action.payload,
      };
    default:
      return state;
  }
};
