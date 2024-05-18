const formatISOToTime = (isoDateString: string) => {
  const date = new Date(isoDateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
};
export default formatISOToTime;
