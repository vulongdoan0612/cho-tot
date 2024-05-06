import { useRouter } from "next/router";

// Hàm để loại bỏ tham số cụ thể từ URL
const RemoveQuery = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1] || ""); // Lấy tham số từ URL

  // Hàm để tạo chuỗi tìm kiếm mới mà loại bỏ tham số cụ thể
  const removeQueryString = (name: string) => {
    searchParams.delete(name);
    return searchParams.toString();
  };

  return { pathname, removeQueryString };
};

export default RemoveQuery;
