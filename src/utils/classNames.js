export const cn = (...classes) => {
  return classes.flat().filter(Boolean).join(" ");
};

export const conditionalClass = (condition, trueClass, falseClass = "") => {
  return condition ? trueClass : falseClass;
};
