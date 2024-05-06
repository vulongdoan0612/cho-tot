const getCityValueName = (text: string) => {
  const commas = text.split(",");
  if (commas.length >= 3) {
    // Lấy nội dung từ dấu phẩy thứ ba trở đi và loại bỏ khoảng trắng ở đầu và cuối chuỗi
    return commas.slice(3).join(",").trim();
  } else {
    // Trả về chuỗi gốc nếu không có đủ ba dấu phẩy
    return text.trim();
  }
};
export default getCityValueName;
