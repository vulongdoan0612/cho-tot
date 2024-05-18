const formatISOToCustomDate = (isoDateString: string) => {
  const daysOfWeek = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  const date = new Date(isoDateString);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${dayOfWeek}, ${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
};
export default formatISOToCustomDate;
