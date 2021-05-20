export const formalizeProjectName = (string) => {
  return string
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();
};
