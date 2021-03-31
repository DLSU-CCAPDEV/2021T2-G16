export const formalizeProjectName = (string) => {
  return string.replace(/\s+/g, "_").toLowerCase();
};
