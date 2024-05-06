import { useRouter } from "next/router";
interface Query {
  [key: string]: string | string[];
}
export const useUpdateQuery = () => {
  const router = useRouter();
  const updateQuery = (key: string, value: string) => {
    if (!router) {
      console.error("useRouter() can only be used within a Next.js component.");
      return;
    }

    const { pathname, query } = router;

    if (query[key]) {
      query[key] = value;
    } else {
      query[key] = value;
    }

    const updatedQuery = new URLSearchParams(query as any).toString();

    router.push({
      pathname,
      search: updatedQuery,
    });
  };
  return updateQuery;
};

export const useRemoveQuery = () => {
  const router = useRouter();
  const removeQuery = (key: string) => {
    if (!router) {
      console.error("useRouter() can only be used within a Next.js component.");
      return;
    }

    const { pathname, query } = router;

    if (query[key]) {
      delete query[key];

      const updatedQuery = new URLSearchParams(query as any).toString();

      router.push({
        pathname,
        search: updatedQuery,
      });
    }
  };
  return removeQuery;
};
