import { fetchDataCurrentPost } from "@/redux/reducers/posts";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchCurrentPost = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    handleFetchCurrentPost();
  }, []);
  
  const handleFetchCurrentPost = () => {
    try {
      dispatch(fetchDataCurrentPost());
    } catch (error) {
      console.log(error);
    }
  };
};
