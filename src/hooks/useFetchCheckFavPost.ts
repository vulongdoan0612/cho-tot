import { fetchCheckFavPost } from "@/redux/reducers/posts";
import { AppDispatch } from "@/redux/store";
import useDidMountEffect from "@/utils/customUseEffect";
import { useDispatch } from "react-redux";

export const useFetchCheckFavPost = ({ body }: any) => {
  const dispatch: AppDispatch = useDispatch();

  useDidMountEffect(() => {
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
