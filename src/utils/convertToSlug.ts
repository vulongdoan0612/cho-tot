const convertToSlug = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD") // Loại bỏ dấu
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-"); // Thay thế khoảng trắng bằng dấu gạch ngang
};
export default convertToSlug;
