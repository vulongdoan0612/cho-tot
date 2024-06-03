import { fetchDataUserProfile } from "@/redux/reducers/profileUser";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchDataUser = ({ body, setSpin, setSpinFull }: any) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    handleFetchDataUser();
  }, [body]);

  const handleFetchDataUser = () => {
    try {
      if (!body.isReady) {
        return;
      }
      dispatch(fetchDataUserProfile({ userId: body.query.id, setSpin, setSpinFull }));
    } catch (error) {
      console.log(error);
    }
  };
};
