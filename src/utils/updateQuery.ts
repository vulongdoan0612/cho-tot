// // utils.js
// "use-client";
// import { useCallback } from "react";
// import { useRouter } from "next/router";

// // Hàm để cập nhật tham số trong URL
// const UpdateQuery = () => {
//   const router = useRouter();
//   const pathname = router.pathname;
//   const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1] || ""); // Lấy tham số từ URL
//   // Hàm để tạo chuỗi tìm kiếm mới bằng cách kết hợp tham số hiện tại với tham số mới
//   const createQueryString = useCallback(
//     (name: any, value: any) => {
//       searchParams.set(name, value);
//       console.log("name:", name);
//       console.log("value:", value);
//       return searchParams.toString();
//     },
//     [searchParams]
//   );

//   return { pathname, createQueryString };
// };

// export default UpdateQuery;
