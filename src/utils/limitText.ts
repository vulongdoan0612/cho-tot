export const limitTextTitle = (text: string) => {
  if (text && text.length > 40) {
    return text.substring(0, 35) + "...";
  }
  return text;
};
export const limitTextTitle2 = (text: string) => {
  if (text && text.length > 70) {
    return text.substring(0, 55) + "...";
  }
  return text;
};
export const limitTextDescription = (text: string) => {
  if (text && text.length > 26) {
    return text.substring(0, 25) + "...";
  }
  return text;
};
export const limitTextUserChat = (text: string) => {
  if (text && text.length > 23) {
    return text.substring(0, 15) + "...";
  }
  return text;
};
