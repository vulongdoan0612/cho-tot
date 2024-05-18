import { fetchDataPost } from "@/redux/reducers/posts";
import { AppDispatch } from "@/redux/store";
import useDidMountEffect from "@/utils/customUseEffect";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchPost = ({ setSpin, body }: any) => {


  const dispatch: AppDispatch = useDispatch();

  useDidMountEffect(() => {
    handleFetchPost();
  }, [body]);
  const handleFetchPost = () => {
    try {
      if (!body.isReady) {
        return;
      }
      setSpin(true);
      setTimeout(() => {
        setSpin(false);
      }, 500);
      dispatch(
        fetchDataPost({
          postId: body.query.postId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
