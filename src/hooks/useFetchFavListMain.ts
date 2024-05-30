import { fetchDataFavListMain } from "@/redux/reducers/posts";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchFavListMain = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    handleFetchFavListMain();
  }, []);
  
  const handleFetchFavListMain = () => {
    try {
      dispatch(fetchDataFavListMain());
    } catch (error) {
      console.log(error);
    }
  };
};
