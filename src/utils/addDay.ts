import moment from "moment";

const addDay = (startDate: string) => {
  const [day, month, year] = startDate.split("-").map(Number);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return null;
  }

  const startDateObj = new Date(year, month - 1, day);
  if (isNaN(startDateObj.getTime())) {
    return null;
  }
  startDateObj.setDate(startDateObj.getDate() + 30);
  const momentDateCCCD = moment(startDateObj);
  const formattedDateCCCD = momentDateCCCD.format("DD-MM-YYYY");

  return formattedDateCCCD;
};

export default addDay;
