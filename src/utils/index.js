const addComma = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const kebabToCamel = (kebab) => {
  const parts = kebab.split("-");
  return parts.reduce(
    (total, next) => total + next.slice(0, 1).toUpperCase() + next.slice(1)
  );
};

const modObjKeys = (obj, funct) => {
  let modArr = Object.entries(obj).map(([key, val]) => [funct(key), val]);
  return Object.fromEntries(modArr);
};

export { addComma, kebabToCamel, modObjKeys };
