export const limitTextTitle = (text: string) => {
  if (text && text.length > 40) {
    return text.substring(0, 35) + "...";
  }
  return text;
};
export const limitTextDescription = (text: string) => {
  if (text && text.length > 26) {
    return text.substring(0, 25) + "...";
  }
  return text;
};
