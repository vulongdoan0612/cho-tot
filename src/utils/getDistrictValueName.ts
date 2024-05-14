const getDistrictValueName = (text: string) => {
  const commas = text.split(",");
  if (commas.length >= 3) {
    return commas.slice(2,3).join(",").trim();
  } else {
    return text.trim();
  }
};
export default getDistrictValueName;
