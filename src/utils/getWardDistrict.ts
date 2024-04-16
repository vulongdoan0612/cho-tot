const getWardDistrict = (text: string) => {
  const index = text?.indexOf(",");
  if (index !== -1) {
    const substring = text?.substring(index + 1).trim();
    return substring;
  }
};
export default getWardDistrict;
