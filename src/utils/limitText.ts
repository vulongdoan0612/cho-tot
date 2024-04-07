export const limitText = (text: string) => {
  if (text && text.length > 13) {
    return text.substring(0, 7) + "..." + text.slice(-3);
  }
  return text;
};
