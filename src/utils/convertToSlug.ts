const convertToSlug = (str: string | undefined | any) => {
  if (str === undefined) return;
  if (str) {
    return str
      .toLowerCase()
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-"); 
  } else {
    return ""; 
  }
};
export default convertToSlug;
