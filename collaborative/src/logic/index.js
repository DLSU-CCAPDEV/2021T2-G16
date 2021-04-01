import $ from "jquery";

export const formalizeProjectName = (string) => {
  return string.replace(/\s+/g, "_").toLowerCase();
};

export const isOverflowingVertically = (elementID) => {
  console.log(elementID);
  console.table($(`.${elementID}`).get());
  return true;
  // { clientHeight, scrollHeight }
  // return $("#elementID").get()scrollHeight > clientHeight;
};

export const isOverflowingHorizontally = ({ clientWidth, scrollWidth }) => {
  return scrollWidth > clientWidth;
};
