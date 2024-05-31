import { fetchHistory } from "@/redux/reducers/payment";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchHistory = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    handleFetchHistory();
  }, []);

  const handleFetchHistory = () => {
    try {
      dispatch(fetchHistory());
    } catch (error) {
      console.log(error);
    }
  };
};
