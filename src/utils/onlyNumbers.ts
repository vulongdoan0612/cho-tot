export const onlyNumbers = (value: any) => {
  const regex = /^[0-9\b]+$/;
  if (value === "" || regex.test(value)) {
    return true;
  }
  return false;
};
