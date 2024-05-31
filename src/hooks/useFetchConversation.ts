import { fetchAllConversation } from "@/redux/reducers/chat";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchAllConversation = ({ setSkeleton }:any) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    handleFetchAllConversation();
  }, []);
  const handleFetchAllConversation = () => {
    try {
      dispatch(fetchAllConversation({ search: "", typeChat: "all", setSkeleton }));
    } catch (error) {
      console.log(error);
    }
  };
};
