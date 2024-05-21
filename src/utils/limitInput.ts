const limitInputCharacters = (input:any, maxLength:any) => {
  if (input.length > maxLength) {
    return input.substring(0, maxLength);
  }
  return input;
};

export default limitInputCharacters;
