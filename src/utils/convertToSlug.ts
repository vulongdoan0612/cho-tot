const convertToSlug = (str: string | undefined) => {
  if (str) {
    return str
      .toLowerCase()
      .normalize("NFD") // Loại bỏ dấu
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-"); // Thay thế khoảng trắng bằng dấu gạch ngang
  } else {
    return ""; // Trả về chuỗi rỗng nếu biến str không có giá trị
  }
};
export default convertToSlug;
