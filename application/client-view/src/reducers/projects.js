export default (projectDatabaseReducer = [], action) => {
  switch (action.type) {
    case "PROJECT_CREATE":
      return [...projectDatabaseReducer, action.payload];
    default:
      return projectDatabaseReducer;
  }
};
