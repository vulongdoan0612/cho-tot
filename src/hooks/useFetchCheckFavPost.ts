import { fetchCheckFavPost } from "@/redux/reducers/posts";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchCheckFavPost = ({ body }: any) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    handleFetchCheckFavPost();
  }, [body]);
  const handleFetchCheckFavPost = () => {
    try {
      if (!body.isReady) {
        return;
      }
      dispatch(fetchCheckFavPost({ postId: body.query.postId }));
    } catch (error) {
      console.log(error);
    }
  };
};
