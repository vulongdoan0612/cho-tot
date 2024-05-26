import { fetchDataFavList } from "@/redux/reducers/posts";
import { AppDispatch } from "@/redux/store";
import useDidMountEffect from "@/utils/customUseEffect";
import { useDispatch } from "react-redux";

export const useFetchFavList = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    handleFetchFavList();
  }, []);
  const handleFetchFavList = () => {
    try {
      dispatch(fetchDataFavList());
    } catch (error) {
      console.log(error);
    }
  };
};
