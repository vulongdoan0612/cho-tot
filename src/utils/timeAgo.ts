import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
const timeAgo = (date: any) => {
  if (date === undefined) return;
  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi });
  return timeAgo;
};
export default timeAgo;
