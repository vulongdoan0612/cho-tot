import { fetchDataFavList } from "@/redux/reducers/posts";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchFavList = ({ setLoading }:any) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    handleFetchFavList();
  }, []);

  const handleFetchFavList = () => {
    try {
      dispatch(fetchDataFavList({ setLoading }));
    } catch (error) {
      console.log(error);
    }
  };
};
