import { fetchAllConversation, fetchConversation } from "@/redux/reducers/chat";
import { AppDispatch } from "@/redux/store";
import useDidMountEffect from "@/utils/customUseEffect";
import { useDispatch } from "react-redux";

export const useFetchAllConversation = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    handleFetchAllConversation();
  }, []);
  const handleFetchAllConversation = () => {
    try {
      dispatch(fetchAllConversation({ search: "", typeChat: "all" }));
    } catch (error) {
      console.log(error);
    }
  };
};
