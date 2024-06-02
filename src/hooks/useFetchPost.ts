import { fetchDataPost } from "@/redux/reducers/posts";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchPost = ({ setSpin, body, setTitle }: any) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    handleFetchPost();
  }, [body]);

  const handleFetchPost = () => {
    try {
      if (!body.isReady) {
        return;
      }

      dispatch(
        fetchDataPost({
          setSpin,
          postId: body.query.postId,
          setTitle,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
