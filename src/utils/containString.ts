// const convertToNoDash = (str) => {
//   if (str === undefined) return;
//   return str.replace(/-/g, " ");
// };

// // Function để chuyển đổi chữ không dấu thành chữ viết thường
// const convertToLowerCase = (str) => {
//   if (str === undefined) return;

//   return str.toLowerCase();
// };

// // Function để loại bỏ dấu từ chữ không dấu
// const removeAccents = (str) => {
//   if (str === undefined) return;

//   return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
// };

// // Function để so sánh input với danh sách quốc gia và trả về quốc gia phù hợp
// export const findMatchingCountry = (input, data) => {
//   const inputNoDash = convertToNoDash(input);
//   const inputLowerCase = convertToLowerCase(inputNoDash);
//   const inputWithoutAccents = removeAccents(inputLowerCase);
//   // Lọc danh sách quốc gia và chuyển đổi thành chữ không dấu
//   const matchingCountry = data.find((country) => {
//     const countryNoDash = convertToNoDash(country);
//     const countryLowerCase = convertToLowerCase(countryNoDash);
//     const countryWithoutAccents = removeAccents(countryLowerCase);
//     return countryWithoutAccents === inputWithoutAccents;
//   });
//   if (matchingCountry) {
//     // Nếu tìm thấy quốc gia khớp, trả về tên gốc của quốc gia từ danh sách ban đầu
//     return matchingCountry;
//   } else {
//     return "";
//   }
// };
