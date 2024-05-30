function addDays(date: any, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatVietnameseDate(date: any) {
  const daysOfWeek = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${dayOfWeek}, ${day}/${month}/${year}`;
}

export function add30DaysAndFormat(dateString: any) {
  const date = new Date(dateString);
  const newDate = addDays(date, 60);
  return formatVietnameseDate(newDate);
}
