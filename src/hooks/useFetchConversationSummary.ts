import { fetchAllConversationSummary } from "@/redux/reducers/chat";
import { AppDispatch } from "@/redux/store";
import useDidMountEffect from "@/utils/customUseEffect";
import { useDispatch } from "react-redux";

export const useFetchAllConversationSummary = () => {
  const dispatch: AppDispatch = useDispatch();

  useDidMountEffect(() => {
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
