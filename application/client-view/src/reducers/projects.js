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
    case "PROJECT_CREATE":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case "PROJECT_DELETE": {
      const { projectName } = action.payload;

      return {
        ...state,
        projects: state.projects.filter(
          (project) => !(project.projectName === projectName)
        ),
      };
    }
    case "PROJECT_UPDATE": {
      const { oldProjectName, newProjectData } = action.payload;

      return {
        ...state,
        projects: state.projects.map((project) =>
          project.projectName === oldProjectName
            ? {
                ...project,
                projectName: newProjectData.projectName,
                description: newProjectData.description,
                backgroundID: newProjectData.backgroundID,
              }
            : project
        ),
      };
    }
    default:
      return state;
  }
};
