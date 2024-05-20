import { addDays, format, parse } from "date-fns";
import { vi } from "date-fns/locale";

const addDay = (startDate: string) => {
  const newDate = addDays(startDate, 30);
  // Định dạng ngày mới thành chuỗi "EEEE, dd/MM/yyyy"
  return format(newDate, "EEEE, dd/MM/yyyy", { locale: vi });
};

export default addDay;
