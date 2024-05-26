import { fetchDataPost, fetchDataPostService } from "@/redux/reducers/posts";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchPostService = ({ body }: any) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    handleFetchPostService();
  }, [body]);
  const handleFetchPostService = () => {
    try {
      if (!body.isReady) {
        return;
      }
      dispatch(
        fetchDataPostService({
          postId: body.query.postId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
