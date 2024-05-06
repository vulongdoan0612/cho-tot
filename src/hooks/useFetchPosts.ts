import { fetchDataPosts } from "@/redux/reducers/posts";
import { AppDispatch } from "@/redux/store";
import useDidMountEffect from "@/utils/customUseEffect";
import { useDispatch } from "react-redux";

export const useFetchPosts = ({
  setSpin,
  setCurrent,
  current,
  pageSize,
  body,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  useDidMountEffect(() => {
    current = 1;
  }, [body]);
  useDidMountEffect(() => {
    handleFetchPosts();
  }, [current, body]);
  const handleFetchPosts = () => {
    try {
      if (!body.isReady) {
        return;
      }
      setSpin(true);
      setTimeout(() => {
        setSpin(false);
      }, 500);
      dispatch(
        fetchDataPosts({
          pageSize,
          current,
          price: body.query.price,
          form: body.query.form,
          sit: body.query.sit,
          fuel: body.query.fuel,
          numberBox: body.query.numberBox,
          city: body.query.city,
          district: body.query.district,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
