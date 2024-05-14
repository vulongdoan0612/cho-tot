const getWardValueName = (text: string) => {
  const commas = text.split(",");
  if (commas.length >= 3) {
    return commas.slice(1,2).join(",").trim();
  } else {
    return text.trim();
  }
};
export default getWardValueName;
