import { fetchDataUserProfile } from "@/redux/reducers/profileUser";
import { AppDispatch } from "@/redux/store";
import useDidMountEffect from "@/utils/customUseEffect";
import { useDispatch } from "react-redux";

export const useFetchDataUser = ({ body, setSpin }: any) => {
  const dispatch: AppDispatch = useDispatch();

  useDidMountEffect(() => {
    setSpin(true);
    setTimeout(() => {
      setSpin(false);
    }, 500);
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
