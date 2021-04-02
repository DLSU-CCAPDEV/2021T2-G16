import $ from "jquery";

export const formalizeProjectName = (string) => {
  return string
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();
};

export const isOverflowingVertically = (elementID) => {
  return true;
  // { clientHeight, scrollHeight }
  // return $("#elementID").get()scrollHeight > clientHeight;
};

export const isOverflowingHorizontally = ({ clientWidth, scrollWidth }) => {
  return scrollWidth > clientWidth;
};
