
import { fetchDataUserProfile } from "@/redux/reducers/profileUser";
import { AppDispatch } from "@/redux/store";
import useDidMountEffect from "@/utils/customUseEffect";
import { useDispatch } from "react-redux";

export const useFetchDataUser = ({ body }: any) => {
  const dispatch: AppDispatch = useDispatch();

  useDidMountEffect(() => {
    handleFetchDataUser();
  }, [body]);
  const handleFetchDataUser = () => {
    try {
      if (!body.isReady) {
        return;
      }
      dispatch(fetchDataUserProfile({ userId: body.query.id }));
    } catch (error) {
      console.log(error);
    }
  };
};
