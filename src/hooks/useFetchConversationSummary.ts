import { fetchAllConversationSummary } from "@/redux/reducers/chat";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchAllConversationSummary = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    handleFetchAllConversationSummary();
  }, []);
  const handleFetchAllConversationSummary = () => {
    try {
      dispatch(fetchAllConversationSummary({ typeChat: "all" }));
    } catch (error) {
      console.log(error);
    }
  };
};
